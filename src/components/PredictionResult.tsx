import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Plane } from "lucide-react";

export interface PredictionData {
  isDelayed: boolean;
  delayProbability: number;
  estimatedDelay: number;
  confidence: number;
  factors: string[];
  riskLevel: "low" | "medium" | "high";
}

interface PredictionResultProps {
  prediction: PredictionData;
  flightInfo: {
    airline: string;
    flightNumber: string;
    route: string;
  };
}

export const PredictionResult = ({ prediction, flightInfo }: PredictionResultProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return <CheckCircle className="h-4 w-4" />;
      case "medium": return <Clock className="h-4 w-4" />;
      case "high": return <AlertTriangle className="h-4 w-4" />;
      default: return <Plane className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          {getRiskIcon(prediction.riskLevel)}
          <CardTitle className="text-xl">Prediction Results</CardTitle>
        </div>
        <CardDescription>
          {flightInfo.airline} {flightInfo.flightNumber} • {flightInfo.route}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Prediction */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold">
            {prediction.isDelayed ? "Likely Delayed" : "On Time"}
          </div>
          <Badge 
            variant="outline" 
            className={`text-sm px-3 py-1 ${getRiskColor(prediction.riskLevel)}`}
          >
            {prediction.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>

        {/* Delay Probability */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Delay Probability</span>
            <span className="font-medium">{Math.round(prediction.delayProbability * 100)}%</span>
          </div>
          <Progress value={prediction.delayProbability * 100} className="h-2" />
        </div>

        {/* Estimated Delay */}
        {prediction.isDelayed && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Estimated Delay</span>
            </div>
            <div className="text-2xl font-bold text-destructive">
              {prediction.estimatedDelay} minutes
            </div>
          </div>
        )}

        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Prediction Confidence</span>
            <span className="font-medium">{Math.round(prediction.confidence * 100)}%</span>
          </div>
          <Progress value={prediction.confidence * 100} className="h-2" />
        </div>

        {/* Contributing Factors */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Key Factors</h3>
          <div className="grid grid-cols-1 gap-2">
            {prediction.factors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {factor}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          <strong>Disclaimer:</strong> This prediction is based on AI analysis of flight patterns and should be used for informational purposes only. Always check with your airline for official flight status.
        </div>
      </CardContent>
    </Card>
  );
};