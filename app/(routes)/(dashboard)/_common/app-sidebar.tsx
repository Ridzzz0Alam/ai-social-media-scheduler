import { Calendar, CreditCard, Lightbulb, Settings } from 'lucide-react';


const mainNav = [
  { name: "Ideas", href: "/ideas", icon: Lightbulb },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];


const AppSidebar = () => {
  return (
    <div>AppSidebar</div>
  )
}

export default AppSidebar