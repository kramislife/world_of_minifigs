import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Metadata from "@/components/layout/Metadata/Metadata";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyState = ({ title, message }) => (
  <>
    <Metadata title={title} />
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-gray-800/50 rounded-full">
              <PackageX className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-400">{message}</p>
              <Link to="/products">
                <Button
                  variant="outline"
                  className="mt-4 border-gray-700 hover:bg-gray-800/50"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </>
);

export default EmptyState;
