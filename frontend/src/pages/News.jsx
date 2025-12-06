import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { newsArticles } from '../data/mock';

const News = () => {
  const featuredArticle = newsArticles[0];
  const otherArticles = newsArticles.slice(1);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-sage-900">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/19957638/pexels-photo-19957638.jpeg"
            alt="News"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 to-stone-900/70" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-sage-500/20 text-sage-300 rounded-full text-sm font-medium mb-6">
              News & Updates
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Latest from
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-400 to-ochre-400"> RIDS</span>
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              Stay updated with our programs, events, and success stories from the field.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-terracotta-500 text-white text-sm rounded-full">
                  Featured
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-ochre-100 text-ochre-700 text-sm rounded-full">
                  {featuredArticle.category}
                </span>
                <span className="text-stone-500 text-sm flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(featuredArticle.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                {featuredArticle.title}
              </h2>
              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                Read Full Story
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-stone-800">All Updates</h2>
            <div className="flex gap-2">
              {['All', 'Announcement', 'Event', 'Success'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white text-stone-600 hover:bg-stone-100 shadow-sm transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-stone-700">
                      {article.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-stone-400 text-sm mb-2 flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-stone-800 mb-3 group-hover:text-terracotta-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <button className="text-terracotta-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-stone-200 text-stone-600 hover:bg-stone-100">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-terracotta-600 to-ochre-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-terracotta-100 text-lg mb-8">
            Subscribe to our newsletter for the latest news and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-terracotta-700 hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
