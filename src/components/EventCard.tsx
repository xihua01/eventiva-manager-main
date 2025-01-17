import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event } from "@/types/event";
import { Calendar, MapPin, Users } from "lucide-react";

type EventCardProps = {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
};

export const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {event.category}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4" />
            <span>{event.participants} participants max</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};