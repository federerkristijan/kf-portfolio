'use client';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-blue-500 text-white">
        <h1 className="text-3xl">Welcome to My Portfolio</h1>
      </header>
      <main className="p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Introduction</h2>
          <p>
            Hello! I'm a web developer with a passion for creating interactive
            and dynamic web applications. Feel free to browse through my work.
          </p>
        </section>
        {/* ProjectsSection component was removed here */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p>
            If you’d like to get in touch, please visit my contact page.
          </p>
        </section>
      </main>
      <footer className="p-4 bg-blue-500 text-white">
        <p>&copy; 2023 My Portfolio</p>
      </footer>
    </div>
  );
}

export default HomePage;