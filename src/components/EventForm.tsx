import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Event } from "@/types/event";
import { useState } from "react";

type EventFormProps = {
  initialData?: Event;
  onSubmit: (data: Omit<Event, "id">) => void;
  onCancel: () => void;
};

export const EventForm = ({ initialData, onSubmit, onCancel }: EventFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    date: initialData?.date || "",
    location: initialData?.location || "",
    category: initialData?.category || "",
    contact: initialData?.contact || "",
    participants: initialData?.participants || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Event" : "Create New Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter event name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter event description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="datetime-local"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Enter event location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Enter event category"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              placeholder="Enter contact information"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Maximum Participants</Label>
            <Input
              id="participants"
              type="number"
              value={formData.participants}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  participants: parseInt(e.target.value) || 0,
                })
              }
              min="0"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};