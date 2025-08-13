import { useState } from "react";
import Reveal from "./Reveal";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Gift, Calendar, Users } from "lucide-react";

const Registry = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Registry form submitted");
    setOpen(false);
  };

  return (
    <section id="registry" className="py-20 px-6 bg-gradient-to-br from-background to-accent/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Registry List
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Create your personalized baby registry and make it easy for friends and family to celebrate your special moments
            </p>
          </div>
        </Reveal>

        <div className="max-w-2xl mx-auto">
          <Reveal>
            <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gift className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Create Gift Registry</h3>
                  <p className="text-muted-foreground mb-8">
                    Set up your registry to help friends and family choose the perfect gifts for your little one
                  </p>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="w-full max-w-xs bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Add New Registry</DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                          Title <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="title"
                          placeholder="Gift registry title"
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            First Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Last Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="partnerFirstName" className="text-sm font-medium">
                            Partner First Name
                          </Label>
                          <Input
                            id="partnerFirstName"
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="partnerLastName" className="text-sm font-medium">
                            Partner Last Name
                          </Label>
                          <Input
                            id="partnerLastName"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your gift registry here, or write a message to your guests"
                          className="min-h-[100px] resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventDate" className="text-sm font-medium">
                          Event Date
                        </Label>
                        <Input
                          id="eventDate"
                          type="date"
                          className="h-12"
                        />
                      </div>

                      <div className="pt-6">
                        <Button 
                          type="submit" 
                          size="lg"
                          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>For Family & Friends</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Event Planning</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Registry;