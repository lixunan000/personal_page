import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Tv, Heart, Calendar, MapPin } from 'lucide-react';

const ProfileCard = () => {
  return (
    <Card className="w-full border border-blue-100/50 shadow-xl shadow-blue-500/5 bg-white/70 backdrop-blur-md overflow-hidden animate-fade-in hover:shadow-blue-500/10 transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center gap-4 bg-gradient-to-b from-primary/10 to-transparent pb-5 pt-6">
        <Avatar className="w-24 h-24 border-4 border-white shadow-xl transition-transform hover:scale-105 duration-300">
          <AvatarImage src="https://miaoda-site-img.cdn.bcebos.com/images/MiaoTu_4a6abe05-c0b1-460b-a0a2-64281142b47e.jpg" alt="李续楠" />
          <AvatarFallback>李续楠</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-foreground tracking-tight">李续楠</CardTitle>
          <p className="text-muted-foreground italic px-4 leading-relaxed text-sm">"一个正在学习用 AI 开发产品的小小程序员"</p>
        </div>
      </CardHeader>
      <CardContent className="pt-5 pb-6">
        {/* 两列布局 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-full">
              <Briefcase className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">现在在做</p>
              <p className="text-sm text-foreground">北京的牛马</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-full">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">出生年月</p>
              <p className="text-sm text-foreground">1997年6月</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-full">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">籍贯</p>
              <p className="text-sm text-foreground">河北张家口</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-full">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">特点</p>
              <p className="text-sm text-foreground">不知道欸</p>
            </div>
          </div>

          {/* 兴趣爱好占满一行 */}
          <div className="col-span-2 flex items-start gap-2">
            <div className="p-1.5 bg-primary/10 rounded-full mt-0.5">
              <Tv className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">兴趣爱好</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {['看电视', '看电影', '看综艺'].map((hobby) => (
                  <Badge key={hobby} variant="secondary" className="font-normal text-xs">
                    {hobby}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
