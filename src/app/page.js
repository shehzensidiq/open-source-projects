'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SearchComponent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/threads');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.threads || []);
        setFilteredPosts(data.threads || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchTerm(query);
    
    if (query) {
      const filtered = posts.filter(post =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchParams, posts]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      const filtered = posts.filter(post =>
        post.content.toLowerCase().includes(value.toLowerCase()) ||
        post.username.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="gradient-text">Open-source</span> Projects
            </h1>
            <p className="hero-subtitle">
              Discover amazing open-source projects and hidden gems from the developer community
            </p>
            <div className="hero-search">
              <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search projects, contributors, or topics..."
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-rocket"></i>
              Featured Projects
            </h2>
            <p className="section-subtitle">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'project' : 'projects'} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading amazing projects...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Oops! Something went wrong</h3>
              <p>We couldn&apos;t load the projects. Please try again later.</p>
              <p className="error-details">Error: {error}</p>
            </div>
          )}

          {!loading && !error && filteredPosts.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <h3>No projects found</h3>
              <p>
                {searchTerm 
                  ? `No projects match your search for "${searchTerm}". Try different keywords.`
                  : 'No projects available at the moment. Check back later!'
                }
              </p>
            </div>
          )}

          {!loading && !error && filteredPosts.length > 0 && (
            <div className="projects-grid">
              {filteredPosts.map((post) => (
                <article key={post.id} className="project-card">
                  <div className="card-header">
                    <div className="project-meta">
                      <span className="project-id">#{post.id}</span>
                      <time className="project-date" dateTime={post.date}>
                        <i className="fas fa-calendar"></i>
                        {formatDate(post.date)}
                      </time>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="project-title">
                      {truncateContent(post.content, 80)}
                    </h3>
                    <p className="project-description">
                      {truncateContent(post.content, 150)}
                    </p>
                    
                    <div className="project-author">
                      <div className="author-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="author-info">
                        <span className="author-name">@{post.username}</span>
                        <span className="author-label">Contributor</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <Link 
                      href={`/post/${post.conversation_id}`} 
                      className="btn btn-primary"
                    >
                      <i className="fas fa-arrow-right"></i>
                      <span>View Project</span>
                    </Link>
                    
                    <div className="project-stats">
                      <span className="stat">
                        <i className="fas fa-code"></i>
                        Open Source
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function SearchFallback() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading search...</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="grain-overlay"></div>
      
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <Link href="/" className="brand-link">
              <i className="fab fa-github brand-icon"></i>
              <span className="brand-text">Open-source Projects</span>
            </Link>
          </div>
          <div className="nav-links">
            <Link href="/" className="nav-link active">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            <Link href="#" className="nav-link">
              <i className="fas fa-star"></i>
              <span>Featured</span>
            </Link>
            <Link href="#" className="nav-link">
              <i className="fas fa-gem"></i>
              <span>Hidden Gems</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="main">
        <Suspense fallback={<SearchFallback />}>
          <SearchComponent />
        </Suspense>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Open-source Projects</h3>
            <p>Discovering and showcasing the best open-source projects and hidden gems in the developer community.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="#">Featured</Link></li>
              <li><Link href="#">Hidden Gems</Link></li>
              <li><Link href="#">About</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Open-source Projects. Built with <i className="fas fa-heart"></i> for the community.</p>
        </div>
      </footer>
    </>
  );
}
