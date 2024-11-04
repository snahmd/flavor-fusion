import React from "react";
import { Link } from "react-router-dom";
import { Coffee, Youtube, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-yellow-100">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Coffee className="h-8 w-8" />
            <span className="text-2xl font-bold">Die Rezeptwelt</span>
          </Link>
          <div>
            <h3 className="mb-4 text-center text-lg font-semibold">
              Social Media
            </h3>
            <div className="flex gap-4">
              <Link to="#" className="rounded-full p-2 hover:bg-yellow-200">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link to="#" className="rounded-full p-2 hover:bg-yellow-200">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link to="#" className="rounded-full p-2 hover:bg-yellow-200">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link to="#" className="rounded-full p-2 hover:bg-yellow-200">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
