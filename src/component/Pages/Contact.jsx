import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";

const Contact = () => {
  return (
    <section className="py-10 ">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:divide-x divide-base-300">
          {/* Contact Info */}
          <div className="space-y-6 md:pr-6">
            <h1 className="text-4xl font-bold text-primary">Get in Touch</h1>
            <p className="text-base-content/70">
              We'd love to hear from you! Fill in the form or find us on the map.
            </p>
            <div className="space-y-4">
              <p className="flex items-center gap-3">
                <MapPinIcon className="w-6 h-6 text-primary" />
                <span>Mirpur, Dhaka</span>
              </p>
              <p className="flex items-center gap-3">
                <PhoneIcon className="w-6 h-6 text-primary" />
                <span>01747-311512</span>
              </p>
              <p className="flex items-center gap-3">
                <EnvelopeIcon className="w-6 h-6 text-primary" />
                <span>asibur70@gmail.com</span>
              </p>
            </div>

            {/* Map */}
            <div className="h-60 rounded-lg overflow-hidden shadow">
              <MapContainer
                center={[23.8223, 90.3654]} // Dhaka coords
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={[23.8223, 90.3654]}>
                  <Popup>We are here!</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Contact Form */}
          <form className="flex flex-col space-y-6 md:pl-6">
            <label className="form-control">
              <span className="label-text">Full Name</span>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control">
              <span className="label-text">Email Address</span>
              <input
                type="email"
                placeholder="john@example.com"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control">
              <span className="label-text">Message</span>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="textarea textarea-bordered w-full"
              ></textarea>
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full md:w-auto self-center"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
