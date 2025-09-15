import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, Users, Heart, Calendar, Phone, MessageSquare } from "lucide-react";
import type { ContactSubmission, EmailSubscription, VolunteerSignup } from "@shared/schema";

export default function AdminPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const { data: contacts = [], isLoading: contactsLoading, error: contactsError } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/admin/contacts']
  });

  const { data: subscribers = [], isLoading: subscribersLoading, error: subscribersError } = useQuery<EmailSubscription[]>({
    queryKey: ['/api/admin/subscribers']
  });

  const { data: volunteers = [], isLoading: volunteersLoading, error: volunteersError } = useQuery<VolunteerSignup[]>({
    queryKey: ['/api/admin/volunteers']
  });

  // Debug logging
  console.log('Admin data:', { contacts, subscribers, volunteers });
  console.log('Admin errors:', { contactsError, subscribersError, volunteersError });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div ref={contentRef} className="min-h-screen bg-soft-beige" data-testid="admin-page">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-deep-green mb-2" data-testid="admin-title">
            Admin Dashboard
          </h1>
          <p className="text-gray-600" data-testid="admin-subtitle">
            View and manage all form submissions from your Oria Dawn website
          </p>
        </div>

        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3" data-testid="admin-tabs">
            <TabsTrigger value="contacts" className="flex items-center gap-2" data-testid="contacts-tab">
              <MessageSquare className="w-4 h-4" />
              Contact Forms ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="flex items-center gap-2" data-testid="subscribers-tab">
              <Mail className="w-4 h-4" />
              Email Subscribers ({subscribers.length})
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center gap-2" data-testid="volunteers-tab">
              <Heart className="w-4 h-4" />
              Volunteer Signups ({volunteers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-4" data-testid="contacts-content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Contact Form Submissions
                </CardTitle>
                <CardDescription>
                  Messages from people interested in your services
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <p>Loading contact submissions...</p>
                ) : contacts.length === 0 ? (
                  <p className="text-gray-500">No contact submissions yet.</p>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <Card key={contact.id} className="border-l-4 border-l-retro-orange" data-testid={`contact-${contact.id}`}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{contact.name}</CardTitle>
                              <CardDescription className="flex items-center gap-4">
                                <span>{contact.email}</span>
                                {contact.interest && <Badge variant="secondary">{contact.interest}</Badge>}
                              </CardDescription>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(contact.createdAt)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-4" data-testid="subscribers-content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Subscribers
                </CardTitle>
                <CardDescription>
                  People who signed up for your newsletter
                </CardDescription>
              </CardHeader>
              <CardContent>
                {subscribersLoading ? (
                  <p>Loading subscribers...</p>
                ) : subscribers.length === 0 ? (
                  <p className="text-gray-500">No email subscribers yet.</p>
                ) : (
                  <div className="space-y-4">
                    {subscribers.map((subscriber) => (
                      <Card key={subscriber.id} className="border-l-4 border-l-sage-mint" data-testid={`subscriber-${subscriber.id}`}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">
                                {subscriber.firstName ? `${subscriber.firstName} (${subscriber.email})` : subscriber.email}
                              </h4>
                              <div className="flex gap-2 mt-2">
                                {subscriber.interestedInAnalytics === 'true' && (
                                  <Badge variant="outline">Analytics</Badge>
                                )}
                                {subscriber.interestedInRise === 'true' && (
                                  <Badge variant="outline">RISE Program</Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(subscriber.createdAt)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-4" data-testid="volunteers-content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Volunteer Signups
                </CardTitle>
                <CardDescription>
                  People interested in helping with RISE programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {volunteersLoading ? (
                  <p>Loading volunteer signups...</p>
                ) : volunteers.length === 0 ? (
                  <p className="text-gray-500">No volunteer signups yet.</p>
                ) : (
                  <div className="space-y-4">
                    {volunteers.map((volunteer) => (
                      <Card key={volunteer.id} className="border-l-4 border-l-warm-peach" data-testid={`volunteer-${volunteer.id}`}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{volunteer.fullName}</CardTitle>
                              <CardDescription className="flex items-center gap-4">
                                <span>{volunteer.email}</span>
                                {volunteer.phoneNumber && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {volunteer.phoneNumber}
                                  </span>
                                )}
                              </CardDescription>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(volunteer.createdAt)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <strong>Availability:</strong> {volunteer.availability}
                          </div>
                          <div>
                            <strong>Why interested:</strong>
                            <p className="text-gray-700 mt-1 whitespace-pre-wrap">{volunteer.whyInterested}</p>
                          </div>
                          <div>
                            <strong>Experience with children:</strong>
                            <p className="text-gray-700 mt-1 whitespace-pre-wrap">{volunteer.experienceWithChildren}</p>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <Badge variant={volunteer.isOver18 === 'true' ? 'default' : 'secondary'}>
                              {volunteer.isOver18 === 'true' ? 'Over 18' : 'Under 18'}
                            </Badge>
                            <Badge variant={volunteer.agreesBackgroundCheck === 'true' ? 'default' : 'secondary'}>
                              {volunteer.agreesBackgroundCheck === 'true' ? 'Agrees to background check' : 'No background check'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}