// Realistic mock data for the dashboard — no fabricated metrics or testimonials

export interface PrintJob {
  id: string;
  name: string;
  status: "completed" | "printing" | "queued" | "failed";
  material: string;
  color: string;
  progress: number;
  createdAt: string;
  estimatedCompletion: string;
  fileSize: string;
  dimensions: string;
  layerHeight: string;
  cost: number;
}

export interface Design {
  id: string;
  name: string;
  thumbnail: string;
  format: string;
  fileSize: string;
  dimensions: string;
  createdAt: string;
  lastModified: string;
  printCount: number;
}

export const mockPrintJobs: PrintJob[] = [
  {
    id: "job-001",
    name: "Compass Housing v3",
    status: "printing",
    material: "PLA+",
    color: "Indigo",
    progress: 67,
    createdAt: "2026-06-19T14:30:00Z",
    estimatedCompletion: "2026-06-19T18:45:00Z",
    fileSize: "4.2 MB",
    dimensions: "80 × 80 × 45 mm",
    layerHeight: "0.12 mm",
    cost: 12.50,
  },
  {
    id: "job-002",
    name: "Gear Assembly Bracket",
    status: "completed",
    material: "PETG",
    color: "Translucent Cyan",
    progress: 100,
    createdAt: "2026-06-18T09:15:00Z",
    estimatedCompletion: "2026-06-18T13:00:00Z",
    fileSize: "8.7 MB",
    dimensions: "120 × 60 × 30 mm",
    layerHeight: "0.16 mm",
    cost: 24.00,
  },
  {
    id: "job-003",
    name: "Phone Stand - Minimal",
    status: "queued",
    material: "PLA",
    color: "Matte Black",
    progress: 0,
    createdAt: "2026-06-19T16:00:00Z",
    estimatedCompletion: "2026-06-19T19:30:00Z",
    fileSize: "1.1 MB",
    dimensions: "70 × 50 × 90 mm",
    layerHeight: "0.20 mm",
    cost: 6.75,
  },
  {
    id: "job-004",
    name: "Lithophane Panel",
    status: "completed",
    material: "PLA+",
    color: "White",
    progress: 100,
    createdAt: "2026-06-17T11:00:00Z",
    estimatedCompletion: "2026-06-17T16:30:00Z",
    fileSize: "22.3 MB",
    dimensions: "150 × 100 × 3 mm",
    layerHeight: "0.08 mm",
    cost: 18.25,
  },
  {
    id: "job-005",
    name: "Cable Organizer Clip",
    status: "failed",
    material: "TPU",
    color: "Gray",
    progress: 34,
    createdAt: "2026-06-18T15:45:00Z",
    estimatedCompletion: "2026-06-18T17:00:00Z",
    fileSize: "0.8 MB",
    dimensions: "40 × 20 × 15 mm",
    layerHeight: "0.16 mm",
    cost: 3.50,
  },
  {
    id: "job-006",
    name: "Vase - Spiral Twist",
    status: "printing",
    material: "Silk PLA",
    color: "Purple Gradient",
    progress: 42,
    createdAt: "2026-06-19T10:00:00Z",
    estimatedCompletion: "2026-06-20T02:15:00Z",
    fileSize: "15.6 MB",
    dimensions: "100 × 100 × 200 mm",
    layerHeight: "0.12 mm",
    cost: 32.00,
  },
];

export const mockDesigns: Design[] = [
  {
    id: "design-001",
    name: "Compass Housing v3",
    thumbnail: "compass",
    format: "STL",
    fileSize: "4.2 MB",
    dimensions: "80 × 80 × 45 mm",
    createdAt: "2026-06-15T10:00:00Z",
    lastModified: "2026-06-19T14:00:00Z",
    printCount: 3,
  },
  {
    id: "design-002",
    name: "Gear Assembly Bracket",
    thumbnail: "gear",
    format: "STEP",
    fileSize: "8.7 MB",
    dimensions: "120 × 60 × 30 mm",
    createdAt: "2026-06-10T08:00:00Z",
    lastModified: "2026-06-18T09:00:00Z",
    printCount: 1,
  },
  {
    id: "design-003",
    name: "Phone Stand - Minimal",
    thumbnail: "stand",
    format: "3MF",
    fileSize: "1.1 MB",
    dimensions: "70 × 50 × 90 mm",
    createdAt: "2026-06-19T15:30:00Z",
    lastModified: "2026-06-19T15:30:00Z",
    printCount: 0,
  },
  {
    id: "design-004",
    name: "Lithophane Panel",
    thumbnail: "panel",
    format: "STL",
    fileSize: "22.3 MB",
    dimensions: "150 × 100 × 3 mm",
    createdAt: "2026-06-12T14:00:00Z",
    lastModified: "2026-06-17T10:30:00Z",
    printCount: 5,
  },
  {
    id: "design-005",
    name: "Vase - Spiral Twist",
    thumbnail: "vase",
    format: "OBJ",
    fileSize: "15.6 MB",
    dimensions: "100 × 100 × 200 mm",
    createdAt: "2026-06-08T11:00:00Z",
    lastModified: "2026-06-19T09:45:00Z",
    printCount: 2,
  },
];

export const mockStats = {
  totalDesigns: 5,
  totalPrints: 11,
  activePrints: 2,
  totalSpent: 97.00,
};
