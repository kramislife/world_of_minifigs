import { BadgeCheck, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProfileProgress = ({ user, addresses, orders }) => {
  const tasks = [
    {
      task: "Add phone number",
      completed: !!user?.contact_number,
      description: "Add your contact number for delivery updates",
    },
    {
      task: "Add profile picture",
      completed: !!user?.profile_picture?.url,
      description: "Upload a profile picture to personalize your account",
    },
    {
      task: "Add shipping address",
      completed: !!addresses?.length,
      description: "Add at least one shipping address",
    },
    {
      task: "Make your first purchase",
      completed: !!orders?.data?.length,
      description: "Complete your first order with us",
    },
    {
      task: "Write a review",
      completed: orders?.data?.some((order) => order.isReviewed),
      description: "Share your experience by reviewing a purchase",
    },
  ];

  const completedTasks = tasks.filter((task) => task.completed);
  const completionPercentage = (completedTasks.length / tasks.length) * 100;

  return (
    <Card className="bg-brand-dark/50 border-none">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Complete Your Profile
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {completionPercentage === 100
                ? "All tasks completed!"
                : `${tasks.length - completedTasks.length} tasks remaining`}
            </p>
          </div>
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-md font-bold text-accent">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-800"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={175.93}
                strokeDashoffset={
                  175.93 - (completionPercentage / 100) * 175.93
                }
                className={`transition-all duration-500 ${
                  completionPercentage === 100
                    ? "text-green-400"
                    : "text-blue-400"
                }`}
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3 mt-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`group flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                task.completed
                  ? "bg-brand-dark/50 border border-brand-end/50"
                  : "bg-brand-end/30"
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`p-1.5 rounded-full flex-shrink-0 ${
                    task.completed ? "bg-accent" : "bg-brand-dark"
                  }`}
                >
                  {task.completed ? (
                    <BadgeCheck className="w-4 h-4 text-foreground" />
                  ) : (
                    <Clock className="w-4 h-4 text-accent" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      task.completed ? "text-accent" : "text-white"
                    }`}
                  >
                    {task.task}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {task.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {completionPercentage === 100 && (
          <div className="mt-6 p-4 bg-brand-dark/50 rounded-lg border border-brand-end/50">
            <div className="flex items-center justify-center gap-2">
              <BadgeCheck className="w-5 h-5 text-accent" />
              <p className="text-emerald-400 text-sm font-medium">
                Profile completed! You're all set!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileProgress;
