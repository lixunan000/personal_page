import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

const PRESET_QUESTIONS = [
  "你现在在做什么?",
  "你有哪些作品?",
  "怎么联系你?",
];

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: '嘿！我是李续楠的 AI 小助手。你可以和我聊聊我的近况、作品，或者任何你感兴趣的话题，我会尽力以本人的口吻回答你哦～ ✨',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (role: 'bot' | 'user', content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        role,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    addMessage('user', text);
    setInputValue('');
    setIsTyping(true);

    try {
      // 构建对话历史（只取最近5轮对话以控制 token）
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content
      }));

      // 添加当前用户消息
      conversationHistory.push({
        role: 'user',
        content: text
      });

      // 调用 Edge Function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: conversationHistory }
      });

      if (error) {
        console.error('Edge function error:', error);
        const errorMsg = await error?.context?.text?.();
        throw new Error(errorMsg || error.message || '调用失败');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const response = data?.message || '抱歉，我暂时无法回答这个问题。';
      addMessage('bot', response);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      
      // 如果是 API Key 未配置的错误，给出友好提示
      if (errorMessage.includes('未配置') || errorMessage.includes('API')) {
        addMessage('bot', '抱歉，大模型服务暂未配置完成。请联系管理员配置 LLM_API_KEY。\n\n你也可以通过邮箱 1500843750@qq.com 直接联系我！');
        toast.error('大模型服务未配置，请先配置 API Key');
      } else {
        addMessage('bot', '抱歉，我遇到了一些问题，请稍后再试。如有紧急事项，请通过邮箱 1500843750@qq.com 联系我。');
        toast.error(`对话失败: ${errorMessage}`);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border border-blue-100/50 shadow-xl shadow-blue-500/5 bg-white/70 backdrop-blur-md animate-fade-in delay-100 hover:shadow-blue-500/10 transition-shadow duration-300">
      <CardHeader className="bg-primary py-4 px-6 rounded-t-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-white text-lg">李续楠的数字分身</CardTitle>
            <p className="text-white/80 text-xs">在线 • 程序员 | AI 自动化</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0 bg-secondary/20">
        <ScrollArea className="h-full px-4 pt-4">
          <div className="space-y-4 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-3 animate-slide-in",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className="w-8 h-8 shrink-0">
                  {msg.role === 'bot' ? (
                    <>
                      <AvatarImage src="https://miaoda-site-img.cdn.bcebos.com/images/MiaoTu_4a6abe05-c0b1-460b-a0a2-64281142b47e.jpg" />
                      <AvatarFallback>LXN</AvatarFallback>
                    </>
                  ) : (
                    <div className="bg-primary/20 w-full h-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </Avatar>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm whitespace-pre-wrap",
                    msg.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-white text-foreground rounded-tl-none border border-border"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://miaoda-site-img.cdn.bcebos.com/images/MiaoTu_4a6abe05-c0b1-460b-a0a2-64281142b47e.jpg" />
                </Avatar>
                <div className="bg-white rounded-2xl px-4 py-2 text-sm border border-border flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-0" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 flex flex-col gap-3 bg-white/50 border-t shrink-0">
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((question) => (
            <Button
              key={question}
              variant="outline"
              size="sm"
              className="text-xs rounded-full bg-white hover:bg-primary/5 hover:text-primary transition-colors border-primary/20"
              onClick={() => handleSend(question)}
              disabled={isTyping}
            >
              {question}
            </Button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="flex w-full gap-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="想聊点什么？直接跟我说吧..."
            className="flex-1 bg-white border-primary/10 focus-visible:ring-primary/30"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
