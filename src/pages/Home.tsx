import React from 'react';
import ProfileCard from '@/components/ProfileCard';
import ChatBox from '@/components/ChatBox';
import Timeline from '@/components/Timeline';
import { Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center py-10 px-4 sm:px-6 md:px-10 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Tech grid background */}
      <div className="absolute inset-0 z-0 opacity-30" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Gradient orbs for depth - 只在桌面端显示 */}
      <div className="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      <div className="hidden md:block absolute top-1/2 left-0 w-72 h-72 bg-indigo-400/5 rounded-full blur-3xl" />

      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/5 left-1/4 w-2 h-2 bg-blue-500/40 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-cyan-500/40 rounded-full animate-float-delayed" />
        <div className="absolute top-2/3 left-1/6 w-2.5 h-2.5 bg-blue-400/30 rounded-full animate-float-slow" />
        <div className="absolute top-4/5 right-1/4 w-1.5 h-1.5 bg-indigo-500/40 rounded-full animate-float" />
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-cyan-400/30 rounded-full animate-float-delayed" />
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-float-slow" />
      </div>

      {/* Main content */}
      <div className="container relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-stretch justify-center">
        {/* Left Side: Profile Card */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary font-medium animate-fade-in mb-2 self-center md:self-start">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">个人信息</span>
          </div>
          <ProfileCard />
          <Timeline />
        </div>

        {/* Right Side: Chat Interaction */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary font-medium animate-fade-in mb-2 self-center md:self-start">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">数字分身聊天</span>
          </div>
          <ChatBox />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 text-center text-muted-foreground/70 text-xs tracking-wider animate-fade-in delay-300">
        <p>© 2026 李续楠个人主页 • 一以贯之的努力，不得懈怠的人生</p>
      </footer>
    </div>
  );
};

export default Home;
