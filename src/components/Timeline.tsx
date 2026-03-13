import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Briefcase } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  type: 'education' | 'work';
}

const timelineData: TimelineItem[] = [
  {
    year: '2016-2020',
    title: '河北工业大学',
    subtitle: '电子信息工程专业（本科）',
    type: 'education',
  },
  {
    year: '2020-2023',
    title: '西安电子科技大学',
    subtitle: '信息与通信工程专业（硕士研究生）',
    type: 'education',
  },
  {
    year: '2023-至今',
    title: '北京',
    subtitle: '程序员',
    type: 'work',
  },
];

const Timeline = () => {
  return (
    <Card className="w-full border border-blue-100/50 shadow-xl shadow-blue-500/5 bg-white/70 backdrop-blur-md overflow-hidden animate-fade-in hover:shadow-blue-500/10 transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          个人经历
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />
          
          {/* Timeline items */}
          <div className="space-y-4">
            {timelineData.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    item.type === 'education' 
                      ? 'bg-blue-100' 
                      : 'bg-cyan-100'
                  }`}>
                    {item.type === 'education' ? (
                      <GraduationCap className="w-3 h-3 text-blue-600" />
                    ) : (
                      <Briefcase className="w-3 h-3 text-cyan-600" />
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {item.year}
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
