import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Calendar, MapPin, ChevronRight, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ngoInfo, impactStats, focusAreas } from '../data/mock';
import { programsAPI, storiesAPI, newsAPI } from '../services/api';

const Home = () => {
  const [programs, setPrograms] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsData, storiesData, newsData] = await Promise.all([
          programsAPI.getAll(),
          storiesAPI.getAll(),
          newsAPI.getAll()
        ]);
        setPrograms(programsData);
        setSuccessStories(storiesData);
        setNewsArticles(newsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-terracotta-900">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1601689892697-b64daa00ff6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxydXJhbCUyMEluZGlhJTIwY29tbXVuaXR5fGVufDB8fHx8MTc2NTA1NjU5M3ww&ixlib=rb-4.1.0&q=85"
              alt="Community"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/80 to-transparent" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-terracotta-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-ochre-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-sage-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm">27+ Years of Community Service</span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Empowering
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-terracotta-400 to-ochre-400">
                Communities
              </span>
              Transforming Lives
            </h1>

            <p className="text-xl text-stone-300 mb-8 leading-relaxed max-w-2xl">
              {ngoInfo.name} is dedicated to uplifting tribal communities, empowering women and children, and fostering sustainable development in rural Rajasthan.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/donate">
                <Button size="lg" className="bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white shadow-xl shadow-terracotta-500/30 hover:shadow-2xl hover:shadow-terracotta-500/40 transition-all duration-300 hover:-translate-y-1 text-lg px-8">
                  <Heart className="mr-2" size={20} />
                  Donate Now
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8">
                  Become a Volunteer
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative -mt-20 z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-terracotta-50 to-ochre-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon === 'Users' && <Users className="text-terracotta-600" size={24} />}
                  {stat.icon === 'Calendar' && <Calendar className="text-terracotta-600" size={24} />}
                  {stat.icon === 'MapPin' && <MapPin className="text-terracotta-600" size={24} />}
                  {stat.icon === 'Heart' && <Heart className="text-terracotta-600" size={24} />}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-stone-800 font-heading">{stat.number}</h3>
                <p className="text-stone-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-medium mb-4">
              What We Do
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Our Focus Areas
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              We work across multiple sectors to create holistic and sustainable impact in communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <Card key={area.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-heading font-bold text-white">
                    {area.title}
                  </h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-stone-600 leading-relaxed">{area.description}</p>
                  <Link
                    to="/programs"
                    className="inline-flex items-center gap-2 text-terracotta-600 font-medium mt-4 hover:gap-3 transition-all"
                  >
                    Learn More <ChevronRight size={16} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4">
                Our Programs
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-800">
                Ongoing Initiatives
              </h2>
            </div>
            <Link to="/programs" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-terracotta-200 text-terracotta-600 hover:bg-terracotta-50">
                View All Programs
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 3).map((program) => (
              <Card key={program.id} className="group overflow-hidden border border-stone-100 hover:border-terracotta-200 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-stone-700">
                      {program.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-bold text-stone-800 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-terracotta-600 font-medium">
                      {program.beneficiaries.toLocaleString()} beneficiaries
                    </span>
                    <Link to="/programs" className="text-stone-400 hover:text-terracotta-600 transition-colors">
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-24 bg-gradient-to-br from-terracotta-50 via-ochre-50 to-sage-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white text-terracotta-700 rounded-full text-sm font-medium mb-4 shadow-sm">
              Success Stories
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Lives We've Touched
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Real stories of transformation from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="bg-white border-0 shadow-xl overflow-hidden group">
                <div className="relative h-64">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2 py-1 bg-terracotta-500 text-white text-xs rounded-full">
                      {story.program}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-white mt-2">{story.name}</h3>
                    <p className="text-white/70 text-sm">{story.location}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-stone-600 italic leading-relaxed">
                    "{story.story}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/impact">
              <Button className="bg-stone-800 hover:bg-stone-900 text-white">
                Read More Stories
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-terracotta-700 to-terracotta-600">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
              <rect width="100" height="100" fill="url(#pattern)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-terracotta-100 mb-10 max-w-2xl mx-auto">
            Your support can transform lives. Together, we can build a brighter future for communities in need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/donate">
              <Button size="lg" className="bg-white text-terracotta-700 hover:bg-white/90 shadow-xl text-lg px-8">
                <Heart className="mr-2" size={20} />
                Donate Now
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Volunteer With Us
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-ochre-100 text-ochre-700 rounded-full text-sm font-medium mb-4">
                News & Updates
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-800">
                Latest from RIDS
              </h2>
            </div>
            <Link to="/news" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-ochre-200 text-ochre-600 hover:bg-ochre-50">
                View All News
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="group overflow-hidden border border-stone-100 hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-ochre-500 text-white text-xs rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-stone-400 text-sm mb-2">
                    {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="font-heading text-lg font-bold text-stone-800 mb-2 group-hover:text-terracotta-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
