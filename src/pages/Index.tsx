import { useState } from "react";
import { FlightForm, FlightData } from "@/components/FlightForm";
import { PredictionResult, PredictionData } from "@/components/PredictionResult";
import { flightPredictor } from "@/lib/flightPredictor";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flightInfo, setFlightInfo] = useState<{
    airline: string;
    flightNumber: string;
    route: string;
  } | null>(null);
  const { toast } = useToast();

  const handleFlightSubmit = async (data: FlightData) => {
    // Validate required fields
    if (!data.airline || !data.origin || !data.destination || !data.departureDate || !data.departureTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required flight details.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay for realistic UX
    setTimeout(() => {
      try {
        const result = flightPredictor.predict(data);
        setPrediction(result);
        setFlightInfo({
          airline: data.airline,
          flightNumber: data.flightNumber || "N/A",
          route: `${data.origin} → ${data.destination}`,
        });
        
        toast({
          title: "Prediction Complete",
          description: `Flight ${data.flightNumber} analysis completed successfully.`,
        });
      } catch (error) {
        toast({
          title: "Prediction Error",
          description: "Unable to analyze flight. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Flight Delay Predictor
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Get AI-powered predictions for flight delays using advanced machine learning algorithms and real-time data analysis
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <FlightForm onSubmit={handleFlightSubmit} isLoading={isLoading} />
          
          {prediction && flightInfo && (
            <PredictionResult prediction={prediction} flightInfo={flightInfo} />
          )}

          {/* Features */}
          {!prediction && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">AI</span>
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning algorithms analyze multiple factors to predict delays
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Real-Time Predictions</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant predictions based on current conditions and historical data
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2">Detailed Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Understand the key factors contributing to potential flight delays
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
