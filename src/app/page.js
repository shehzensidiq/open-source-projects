'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

function HomePageContent() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const url = currentPage === 1 
          ? 'https://twitter-api.opensourceprojects.dev/threads'
          : `https://twitter-api.opensourceprojects.dev/threads?page=${currentPage}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.threads);
        setPagination(data.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page === 1) {
      router.push('/');
    } else {
      router.push(`/?page=${page}`);
    }
  };

  const renderPaginationButtons = () => {
    if (!pagination) return null;

    const buttons = [];
    const { current_page, total_pages, has_previous, has_next } = pagination;

    // Previous button
    if (has_previous) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(current_page - 1)}
          className="pagination-btn pagination-nav"
        >
          ← Previous
        </button>
      );
    }

    // Page number buttons
    const startPage = Math.max(1, current_page - 2);
    const endPage = Math.min(total_pages, current_page + 2);

    // First page and ellipsis
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-btn"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    // Page numbers around current page
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${i === current_page ? 'current' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis
    if (endPage < total_pages) {
      if (endPage < total_pages - 1) {
        buttons.push(
          <span key="ellipsis2" className="pagination-ellipsis">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={total_pages}
          onClick={() => handlePageChange(total_pages)}
          className="pagination-btn"
        >
          {total_pages}
        </button>
      );
    }

    // Next button
    if (has_next) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(current_page + 1)}
          className="pagination-btn pagination-nav"
        >
          Next →
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="grain-overlay"></div>
    );
  }

  if (error) {
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
              <Link href="/" className="nav-link">
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
          <div className="error-container">
            <h1>Error loading posts: {error}</h1>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Try Again
            </button>
          </div>
        </main>
      </>
    );
  }

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
            <Link href="/" className="nav-link">
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
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Amazing
              <span className="gradient-text">Open-source Projects</span>
            </h1>
            <p className="hero-description">
              Curating the best open-source projects, hidden gems, and innovative tools that are shaping the future of development.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{pagination?.total_items || 0}</span>
                <span className="stat-label">Projects Featured</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Possibilities</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Open Source</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="code-window">
              <div className="window-header">
                <div className="window-controls">
                  <span className="control close"></span>
                  <span className="control minimize"></span>
                  <span className="control maximize"></span>
                </div>
                <span className="window-title">open-source-projects.json</span>
              </div>
              <div className="code-content">
                <pre><code>{`{
  "mission": "showcase_amazing_projects",
  "focus": ["innovation", "quality", "community"],
  "hidden_gems": true,
  "trending": true,
  "status": "actively_curated"
}`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              Hand-picked open-source projects that are making waves in the developer community
            </p>
          </div>

          <div className="projects-grid">
            {posts.map((post, index) => (
              <article key={post.id} className="project-card" style={{animationDelay: `${(index % 6) * 0.1}s`}}>
                <div className="card-header">
                  <div className="card-meta">
                    <span className="card-category">Open Source</span>
                    <time className="card-date" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <Link href={`/post/${post.conversation_id}`}>
                      {post.content.length > 80 
                        ? `${post.content.substring(0, 80)}...` 
                        : post.content}
                    </Link>
                  </h3>
                  <p className="card-excerpt">
                    By @{post.username} • {post.content}
                  </p>
                </div>
                <div className="card-footer">
                  <div className="card-links">
                    {/* You can add social links here if available in your data */}
                  </div>
                  <Link href={`/post/${post.conversation_id}`} className="read-more">
                    <span>Learn More</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {pagination && pagination.total_pages > 1 && (
            <div className="pagination">
              {renderPaginationButtons()}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Open-source Projects</h3>
            <p>Discovering and showcasing the best open-source projects and hidden gems in the developer community.</p>
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
          <p>&copy; 2024 Open-source Projects. Built with <i className="fas fa-heart"></i> for the community.</p>
        </div>
      </footer>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
