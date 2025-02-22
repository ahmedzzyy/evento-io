import Link from "next/link"
import { Calendar, Ticket, Users, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import MobileNav from "@/components/MobileNav"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full sm:w-auto mb-4 sm:mb-0">
            <Link href="/" className="text-2xl font-bold text-salmon-600">
              Evento.io
            </Link>
            <MobileNav />
          </div>
          <nav className="hidden sm:flex space-x-4">
            <Link href="#" className="text-gray-600 hover:text-salmon-600">
              Browse Events
            </Link>
            <Link href="#" className="text-gray-600 hover:text-salmon-600">
              Create Event
            </Link>
            <Link href="#" className="text-gray-600 hover:text-salmon-600">
              Login
            </Link>
            <Button className="bg-gradient-to-r from-salmon-500 to-salmon-600 hover:from-salmon-600 hover:to-salmon-700 text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">Sign Up</Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-salmon-50 to-salmon-100 py-12 sm:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Plan, Manage, and Enjoy Events with Ease
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Your all-in-one platform for creating, discovering, and attending amazing events.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-gradient-to-r from-salmon-500 to-salmon-600 hover:from-salmon-600 hover:to-salmon-700 text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg px-8 py-3 w-full sm:w-auto">
                Create an Event
              </Button>
              <Button
                variant="outline"
                className="text-salmon-600 border-salmon-600 hover:bg-salmon-50 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg px-8 py-3 w-full sm:w-auto"
              >
                Explore Events
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">Why Choose Evento.io?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <FeatureCard
                icon={<Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-salmon-600" />}
                title="Easy Event Creation"
                description="Set up your event in minutes with our intuitive tools."
              />
              <FeatureCard
                icon={<Ticket className="w-10 h-10 sm:w-12 sm:h-12 text-salmon-600" />}
                title="Seamless Ticketing"
                description="Hassle-free ticket sales and management for organizers and attendees."
              />
              <FeatureCard
                icon={<Users className="w-10 h-10 sm:w-12 sm:h-12 text-salmon-600" />}
                title="Grow Your Community"
                description="Connect with like-minded individuals and expand your network."
              />
              <FeatureCard
                icon={<TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-salmon-600" />}
                title="Insightful Analytics"
                description="Track your event's performance with detailed analytics."
              />
            </div>
          </div>
        </section>

        {/* Popular Events Section */}
        <section className="bg-gray-50 py-12 sm:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">Popular Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <EventCard
                title="Tech Conference 2023"
                date="Aug 15-17, 2023"
                location="San Francisco, CA"
              />
              <EventCard
                title="Summer Music Festival"
                date="Jul 1-3, 2023"
                location="Austin, TX"
              />
              <EventCard
                title="Food & Wine Expo"
                date="Sep 5-7, 2023"
                location="New York, NY"
              />
            </div>
            <div className="text-center mt-8 sm:mt-12">
              <Button variant="outline" className="text-salmon-600 border-salmon-600 hover:bg-salmon-50 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto">
                View All Events
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-salmon-600 py-12 sm:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Host Your Next Event?</h2>
            <p className="text-lg sm:text-xl text-white mb-8">Join thousands of successful event organizers on Evento.io</p>
            <Button className="bg-white text-salmon-600 hover:bg-gray-100 text-lg px-8 py-3 w-full sm:w-auto">
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Evento.io</h3>
              <p className="text-sm text-gray-400">Your all-in-one event planning and ticketing platform.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © 2025 Evento.io. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-center">
      <div className="flex justify-center mb-4 text-salmon-600">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

interface EventCardProps {
  title: string
  date: string
  location: string
  imageUrl?: string
}

function EventCard({ title, date, location }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-2">{date}</p>
        <p className="text-gray-600 mb-4">{location}</p>
        <Button className="w-full bg-gradient-to-r from-salmon-500 to-salmon-600 hover:from-salmon-600 hover:to-salmon-700 text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          Learn More
        </Button>
      </div>
    </div>
  )
}
