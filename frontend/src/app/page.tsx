'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Home() {

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Nike-Style Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter mb-6 leading-none">
            <div className="block">NEVER</div>
            <div className="block">BEEN</div>
            <div className="block">DONE</div>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300 mb-8 sm:mb-12 tracking-wide max-w-2xl mx-auto px-4">
            Is what we do. Discover products that push boundaries and redefine excellence.
          </p>

          {/* Nike-Style Horizontal Line */}
          <div className="w-16 sm:w-24 h-1 bg-white mx-auto mb-8 sm:mb-12"></div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Link
              href="/products"
              className="w-full sm:w-auto bg-white text-black px-8 sm:px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 uppercase tracking-wide min-w-[200px] text-center"
            >
              Shop Now
            </Link>
            <Link
              href="/products?category=Electronics"
              className="w-full sm:w-auto border-2 border-white text-white px-8 sm:px-12 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 uppercase tracking-wide min-w-[200px] text-center"
            >
              Electronics
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>



      {/* Nike-Style Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-6">
              Why We're Different
            </h2>
            <p className="text-xl text-gray-600 font-medium">Excellence in every detail</p>
            <div className="w-24 h-1 bg-black mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group text-center p-6 sm:p-8 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-colors duration-500">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase tracking-wide">Fast Shipping</h3>
              <p className="text-gray-600 group-hover:text-gray-300 font-medium text-sm sm:text-base">Free shipping on orders over $100. Lightning-fast delivery to your door.</p>
            </div>

            <div className="group text-center p-6 sm:p-8 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-colors duration-500">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase tracking-wide">Quality First</h3>
              <p className="text-gray-600 group-hover:text-gray-300 font-medium text-sm sm:text-base">Every product is rigorously tested and selected for superior quality.</p>
            </div>

            <div className="group text-center p-6 sm:p-8 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-colors duration-500">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase tracking-wide">Secure & Safe</h3>
              <p className="text-gray-600 group-hover:text-gray-300 font-medium text-sm sm:text-base">Bank-level security protects your information and transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nike-Style Categories Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-6">
              Shop Categories
            </h2>
            <p className="text-xl text-gray-600 font-medium">Find your perfect match</p>
            <div className="w-24 h-1 bg-black mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/products?category=Electronics" className="group">
              <div className="relative h-64 bg-black rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-4 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-2xl font-bold uppercase tracking-wide">Electronics</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=Clothing" className="group">
              <div className="relative h-64 bg-black rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-red-600 opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-4 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="text-2xl font-bold uppercase tracking-wide">Clothing</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=Home" className="group">
              <div className="relative h-64 bg-black rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600 opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-4 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <h3 className="text-2xl font-bold uppercase tracking-wide">Home</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products" className="group">
              <div className="relative h-64 bg-black rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-black opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-4 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-2xl font-bold uppercase tracking-wide">All Products</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Nike-Style CTA Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-none">
            <div className="block">JUST</div>
            <div className="block">DO</div>
            <div className="block">IT</div>
          </h2>

          <p className="text-xl md:text-2xl font-medium text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of satisfied customers who never settle for ordinary.
            Your next breakthrough is waiting.
          </p>

          <div className="w-24 h-1 bg-white mx-auto mb-12"></div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/products"
              className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 uppercase tracking-wide min-w-[250px]"
            >
              Browse All Products
            </Link>
            <Link
              href="/products?featured=true"
              className="border-2 border-white text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 uppercase tracking-wide min-w-[250px]"
            >
              Featured Items
            </Link>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}
