import React from 'react';

export default function ThemeShowcase() {
  return (
    <div className="container-page">
      <h1 className="page-title">Custom Theme Showcase</h1>
      <p className="text-lg mb-12">This page demonstrates all the theme components with our custom styling applied.</p>
      
      {/* Typography Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Typography</h2>
        <div className="card">
          <h1 className="text-4xl mb-4">Heading 1</h1>
          <h2 className="text-3xl mb-4">Heading 2</h2>
          <h3 className="text-2xl mb-4">Heading 3</h3>
          <h4 className="text-xl mb-4">Heading 4</h4>
          <h5 className="text-lg mb-4">Heading 5</h5>
          <h6 className="text-base mb-6">Heading 6</h6>
          
          <p className="text-lg mb-4">
            This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and a{' '}
            <a href="#">link</a> styled using our theme.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2">Regular text</h4>
              <p>This is regular text in our Poppins font.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Small text</h4>
              <p className="text-sm">This is small text in our Poppins font.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Colors Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Colors</h2>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Primary Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div>
              <div className="h-20 bg-primary rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Primary</p>
              <p className="text-xs text-gray-500">#0A1D56</p>
            </div>
            <div>
              <div className="h-20 bg-primary-400 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Primary 400</p>
            </div>
            <div>
              <div className="h-20 bg-primary-300 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Primary 300</p>
            </div>
            <div>
              <div className="h-20 bg-primary-200 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Primary 200</p>
            </div>
            <div>
              <div className="h-20 bg-primary-100 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Primary 100</p>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Accent Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div>
              <div className="h-20 bg-accent rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Accent</p>
              <p className="text-xs text-gray-500">#4A90E2</p>
            </div>
            <div>
              <div className="h-20 bg-accent-400 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Accent 400</p>
            </div>
            <div>
              <div className="h-20 bg-accent-300 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Accent 300</p>
            </div>
            <div>
              <div className="h-20 bg-accent-200 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Accent 200</p>
            </div>
            <div>
              <div className="h-20 bg-accent-100 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Accent 100</p>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Background Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="h-20 bg-background rounded-lg mb-2 border border-gray-200"></div>
              <p className="text-sm font-medium">Background</p>
              <p className="text-xs text-gray-500">#F9FAFC</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="h-20 bg-background-paper rounded-lg mb-2 border border-gray-200"></div>
              <p className="text-sm font-medium">Background Paper</p>
              <p className="text-xs text-gray-500">#FFFFFF</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="h-20 bg-background-subtle rounded-lg mb-2 border border-gray-200"></div>
              <p className="text-sm font-medium">Background Subtle</p>
              <p className="text-xs text-gray-500">#F1F5F9</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Buttons Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Buttons</h2>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Button Variants</h3>
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-accent">Accent Button</button>
            <button className="btn btn-outline">Outline Button</button>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Button Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary">Regular</button>
            <button className="btn btn-primary btn-lg">Large</button>
          </div>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Basic Card</h3>
            <p className="text-gray-600 mb-4">
              This is a basic card with our standard shadow.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          
          <div className="card card-accent">
            <h3 className="text-xl font-bold mb-2">Accent Card</h3>
            <p className="text-gray-600 mb-4">
              This card has an accent border on the left side.
            </p>
            <button className="btn btn-accent">Learn More</button>
          </div>
          
          <div className="card shadow-soft-lg">
            <h3 className="text-xl font-bold mb-2">Card with Larger Shadow</h3>
            <p className="text-gray-600 mb-4">
              This card has a larger soft shadow.
            </p>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
      </section>
      
      {/* Table Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Tables</h2>
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Title</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td className="font-medium text-gray-900">User {i}</td>
                  <td>Project Manager</td>
                  <td>user{i}@example.com</td>
                  <td>Admin</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Form Elements */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Form Elements</h2>
        <div className="card">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" className="form-input" placeholder="Enter your name" />
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Enter your email" />
              <p className="form-error">Please enter a valid email address</p>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" rows={4} className="form-input" placeholder="Enter your message"></textarea>
            </div>
            
            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Shadows Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Shadow Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-soft-xs p-6 text-center">
            <p className="font-medium">shadow-soft-xs</p>
          </div>
          <div className="bg-white rounded-xl shadow-soft-sm p-6 text-center">
            <p className="font-medium">shadow-soft-sm</p>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-6 text-center">
            <p className="font-medium">shadow-soft</p>
          </div>
          <div className="bg-white rounded-xl shadow-soft-md p-6 text-center">
            <p className="font-medium">shadow-soft-md</p>
          </div>
          <div className="bg-white rounded-xl shadow-soft-lg p-6 text-center">
            <p className="font-medium">shadow-soft-lg</p>
          </div>
          <div className="bg-white rounded-xl shadow-soft-xl p-6 text-center">
            <p className="font-medium">shadow-soft-xl</p>
          </div>
          <div className="bg-white rounded-xl shadow-soft-2xl p-6 text-center md:col-span-2">
            <p className="font-medium">shadow-soft-2xl</p>
          </div>
        </div>
      </section>
      
      {/* Navbar Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Navbar Example</h2>
        <div className="navbar rounded-xl">
          <div className="navbar-container flex items-center justify-between h-16">
            <div className="navbar-brand">Church App</div>
            <div className="flex items-center space-x-4">
              <a href="#" className="navbar-link-active">Home</a>
              <a href="#" className="navbar-link">About</a>
              <a href="#" className="navbar-link">Services</a>
              <a href="#" className="navbar-link">Contact</a>
              <button className="btn btn-primary btn-sm">Login</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 