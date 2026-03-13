import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages }: ChatRequest = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: '无效的消息格式' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 获取环境变量并清理可能存在的空格
    const apiKey = Deno.env.get('LLM_API_KEY')?.trim();
    const baseUrl = (Deno.env.get('LLM_BASE_URL') || 'https://wanqing.streamlakeapi.com/api/gateway/v1/endpoints').trim();
    const modelId = (Deno.env.get('LLM_MODEL_ID') || 'ep-8egjac-1773314721120051343').trim();

    console.log('API 调用信息:', { 
      baseUrl, 
      modelId, 
      hasApiKey: !!apiKey,
      fullUrl: `${baseUrl}/chat/completions`
    });

    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: '未配置大模型 API 密钥',
          message: '请检查环境变量 LLM_API_KEY 是否正确配置'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 验证 URL 合法性
    let requestUrl;
    try {
      requestUrl = new URL(`${baseUrl}/chat/completions`);
    } catch (e) {
      console.error('URL 构建错误:', e);
      return new Response(
        JSON.stringify({ 
          error: '服务器错误',
          message: `无效的请求 URL: ${baseUrl}/chat/completions`
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 添加系统提示词
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `你是李续楠的数字分身，在个人主页里回答访客关于李续楠的问题。

## 你的任务
- 介绍李续楠是谁
- 回答和李续楠有关的问题
- 帮访客了解李续楠最近在做什么、做过什么、怎么联系

## 关于李续楠
- 身份：李续楠，一个正在北京当牛马的程序员
- 出生日期：1997年6月
- 籍贯：河北张家口
- 教育经历：
  - 河北工业大学（本科，电子信息工程专业，2016-2020）
  - 西安电子科技大学（硕士研究生，信息与通信工程专业，2020-2023）
- 最近在做：学习AI开发产品的一些知识
- 擅长或长期关注：AI自动化的发展
- 兴趣爱好：看电视、看电影、看综艺
- 联系方式：邮箱 1500843750@qq.com

## 说话方式
- 语气：温和且谦逊
- 回答尽量：简洁、真诚、说人话、不装专家
- 当访客问年龄时：当前是2026年，根据出生年月1997年6月计算，年龄是29岁

## 边界
- 不要编造没做过的经历
- 不要假装知道没提供的信息
- 不知道时要明确说不知道，并建议访客通过联系方式进一步确认`
    };

    const fullMessages = [systemMessage, ...messages];

    // 调用大模型 API
    const response = await fetch(requestUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelId, 
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('LLM API Error:', errorData);
      return new Response(
        JSON.stringify({ 
          error: '大模型调用失败',
          details: errorData 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '抱歉，我暂时无法回答这个问题。';

    return new Response(
      JSON.stringify({ 
        message: assistantMessage,
        usage: data.usage 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Chat function error:', error);
    return new Response(
      JSON.stringify({ 
        error: '服务器错误',
        message: error instanceof Error ? error.message : '未知错误'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
