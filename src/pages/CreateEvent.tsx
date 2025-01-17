import { EventForm } from "@/components/EventForm";
import { useToast } from "@/components/ui/use-toast";
import { useEventStore } from "@/store/eventStore";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addEvent } = useEventStore();

  const handleSubmit = (data: any) => {
    addEvent(data);
    toast({
      title: "Success",
      description: "Event created successfully",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <EventForm onSubmit={handleSubmit} onCancel={() => navigate("/")} />
    </div>
  );
}