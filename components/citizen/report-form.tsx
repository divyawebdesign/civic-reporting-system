"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Mic, Upload, CheckCircle2 } from "lucide-react";
import { useIssues } from "@/lib/issue-context";
import type { IssueCategory } from "@/lib/types";

export function ReportForm() {
  const { addIssue } = useIssues();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as IssueCategory,
    citizenName: "",
    citizenPhone: "",
    citizenEmail: "",
    photos: [] as string[], // BASE64 images
  });

  // Convert uploaded image to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, base64],
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const location = {
      lat: 23.3441 + (Math.random() - 0.5) * 0.1,
      lng: 85.3096 + (Math.random() - 0.5) * 0.1,
      address: "Ranchi, Jharkhand",
    };

    addIssue({
      ...formData,
      status: "submitted",
      priority: "medium",
      location,
      photos: formData.photos.length > 0 ? formData.photos : [], // use uploaded images
    });

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: "",
        description: "",
        category: "" as IssueCategory,
        citizenName: "",
        citizenPhone: "",
        citizenEmail: "",
        photos: [],
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 py-8">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
            <h3 className="text-2xl font-bold text-green-900">
              Report Submitted!
            </h3>
            <p className="text-center text-green-700">
              Your issue has been reported successfully. You'll receive updates
              via SMS and email.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report a Civic Issue</CardTitle>
        <CardDescription>
          Help us improve your community by reporting issues
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Issue Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  category: value as IssueCategory,
                }))
              }
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pothole">Pothole</SelectItem>
                <SelectItem value="streetlight">Street Light</SelectItem>
                <SelectItem value="garbage">Garbage Collection</SelectItem>
                <SelectItem value="water">Water Supply</SelectItem>
                <SelectItem value="drainage">Drainage</SelectItem>
                <SelectItem value="road">Road Damage</SelectItem>
                <SelectItem value="park">Park Maintenance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Issue Title *</Label>
            <Input
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Detailed Description *</Label>
            <Textarea
              placeholder="Provide more details..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <Label>Add Photos</Label>

            {/* Upload from PC */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Image from Laptop
            </Button>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {/* Preview images */}
            {formData.photos.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-2">
                {formData.photos.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="h-24 w-24 rounded object-cover border"
                    alt="Uploaded"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Button type="button" variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" /> Use Current Location
            </Button>
            <p className="text-xs text-muted-foreground">
              Location will be captured automatically when you submit.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-semibold">Your Contact Information</h4>

            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                placeholder="Your name"
                value={formData.citizenName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    citizenName: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.citizenPhone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    citizenPhone: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.citizenEmail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    citizenEmail: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
