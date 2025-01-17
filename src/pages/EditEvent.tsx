import { EventForm } from "@/components/EventForm";
import { useToast } from "@/components/ui/use-toast";
import { useEventStore } from "@/store/eventStore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { events, updateEvent } = useEventStore();
  const event = events.find((e) => e.id === id);

  if (!event) {
    navigate("/");
    return null;
  }

  const handleSubmit = (data: any) => {
    updateEvent(id!, data);
    toast({
      title: "Success",
      description: "Event updated successfully",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <EventForm
        initialData={event}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}