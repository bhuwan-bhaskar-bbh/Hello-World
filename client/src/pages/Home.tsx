import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  ChevronRight,
  Database,
  FileDown,
  FileText,
  LayoutGrid,
  Moon,
  PanelLeft,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Upload,
  Users,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const SESSIONS = [
  {
    name: "Global Retail Revamp",
    time: "Active · 12m ago",
    tags: ["WAN", "Security"],
  },
  {
    name: "Healthcare Edge Pilot",
    time: "Updated · 2h ago",
    tags: ["Edge", "Sizing"],
  },
  {
    name: "FinTech DR Strategy",
    time: "Updated · 1d ago",
    tags: ["DR", "Proposal"],
  },
  {
    name: "APAC Cloud Expansion",
    time: "Archived · 5d ago",
    tags: ["Cloud", "Docs"],
  },
];

const PRODUCTS = [
  {
    id: "nimbus",
    name: "Nimbus SD-WAN",
    description: "Multi-cloud connectivity with dynamic traffic steering.",
    mandatory: ["Bandwidth tier", "Region", "Redundancy"],
    optional: ["Analytics", "Zero trust", "Managed onboarding"],
  },
  {
    id: "aurora",
    name: "Aurora Secure Edge",
    description: "Unified SSE + firewall for hybrid workforces.",
    mandatory: ["User count", "Identity provider", "Policy template"],
    optional: ["CASB", "DLP", "ZTNA posture"],
  },
  {
    id: "orbit",
    name: "Orbit Observability",
    description: "Full-stack monitoring with AI-driven alerts.",
    mandatory: ["Telemetry sources", "Retention"],
    optional: ["Synthetic tests", "Anomaly packs"],
  },
];

const OUTPUTS = [
  {
    title: "Solution document",
    description: "Executive summary, requirements, and architecture decisions.",
  },
  {
    title: "Architecture diagram",
    description: "Layered view for core, edge, and cloud components.",
  },
  {
    title: "Sizing sheet",
    description: "Capacity sizing with redundancy and growth factors.",
  },
  {
    title: "Customer proposal",
    description: "Narrative proposal with pricing and timeline inputs.",
  },
];

const PARAMETERS = [
  {
    name: "Global users",
    level: "Solution",
    type: "number",
    required: "Yes",
    defaultValue: "8,000",
  },
  {
    name: "Site topology",
    level: "Site",
    type: "select",
    required: "Optional",
    defaultValue: "Hub & Spoke",
  },
  {
    name: "Circuit SLA",
    level: "Circuit",
    type: "select",
    required: "Yes",
    defaultValue: "99.99%",
  },
  {
    name: "Telemetry tier",
    level: "Solution",
    type: "multiselect",
    required: "Optional",
    defaultValue: "Core + Edge",
  },
];

const LOV_OPTIONS = [
  "Tier 1",
  "Tier 2",
  "Tier 3",
  "Partner Managed",
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "nimbus",
    "aurora",
  ]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = storedTheme ? storedTheme === "dark" : true;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const activeProducts = useMemo(
    () => PRODUCTS.filter((product) => selectedProducts.includes(product.id)),
    [selectedProducts]
  );

  const handleProductToggle = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <div className="relative flex min-h-screen">
        <aside
          className={cn(
            "border-r border-border/60 bg-card/80 backdrop-blur-xl transition-all duration-300",
            sidebarCollapsed ? "w-20" : "w-72"
          )}
        >
          <div className="flex h-full flex-col gap-6 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <p className="text-sm font-semibold">Architect Studio</p>
                    <p className="text-xs text-muted-foreground">Enterprise workspace</p>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed((prev) => !prev)}
                aria-label="Toggle sidebar"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </div>

            <Button className="w-full justify-between" size="sm">
              {!sidebarCollapsed && "New session"}
              <Plus className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              {!sidebarCollapsed && (
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Sessions
                </p>
              )}
              <ScrollArea className={cn("pr-3", sidebarCollapsed ? "h-[18rem]" : "h-[22rem]")}
              >
                <div className="space-y-3">
                  {SESSIONS.map((session) => (
                    <button
                      key={session.name}
                      type="button"
                      className={cn(
                        "flex w-full flex-col rounded-xl border border-border/50 bg-background/60 p-3 text-left transition hover:border-primary/40",
                        sidebarCollapsed && "items-center"
                      )}
                    >
                      <span className="text-sm font-medium">
                        {sidebarCollapsed ? session.name.split(" ")[0] : session.name}
                      </span>
                      {!sidebarCollapsed && (
                        <>
                          <span className="text-xs text-muted-foreground">{session.time}</span>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {session.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[10px]">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="mt-auto space-y-3">
              <Separator className="bg-border/50" />
              <div className={cn("flex items-center justify-between", sidebarCollapsed && "flex-col gap-3")}
              >
                {!sidebarCollapsed && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold">Replit Authentication</p>
                    <p className="text-[11px] text-muted-foreground">
                      Secure login enabled
                    </p>
                  </div>
                )}
                <Badge variant="secondary" className="text-[10px]">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-1 flex-col gap-6 px-6 py-6">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/70 px-6 py-4 shadow-sm backdrop-blur-xl">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Solution Architect Workspace
              </p>
              <h1 className="text-2xl font-semibold">Enterprise Solution Studio</h1>
              <p className="text-sm text-muted-foreground">
                Design, configure, and deliver architecture outputs faster with AI.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
                <Search className="h-3.5 w-3.5" />
                <span>Search sessions, products, outputs</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2">
                <Sun className="h-3.5 w-3.5" />
                <Switch checked={isDark} onCheckedChange={setIsDark} />
                <Moon className="h-3.5 w-3.5" />
              </div>
              <Button variant="secondary" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Share session
              </Button>
            </div>
          </header>

          <Tabs defaultValue="workspace" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-2 rounded-2xl border border-border/60 bg-card/70">
              <TabsTrigger value="workspace" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                General user mode
              </TabsTrigger>
              <TabsTrigger value="admin" className="gap-2">
                <ShieldCheck className="h-4 w-4" />
                Admin console
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workspace" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <Card className="border-border/60 bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LayoutGrid className="h-5 w-5 text-primary" />
                      Product selection & configuration
                    </CardTitle>
                    <CardDescription>
                      Choose products, set mandatory parameters, and expand optional fields as needed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <Tabs defaultValue="connectivity" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3 rounded-xl">
                        <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="observability">Observability</TabsTrigger>
                      </TabsList>
                      <TabsContent value="connectivity" className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {PRODUCTS.map((product) => (
                            <Button
                              key={product.id}
                              variant={selectedProducts.includes(product.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleProductToggle(product.id)}
                            >
                              {product.name}
                            </Button>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="security" className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Zero trust enforcement</Badge>
                          <Badge variant="outline">Secure web gateway</Badge>
                          <Badge variant="outline">CASB</Badge>
                          <Badge variant="outline">DLP suite</Badge>
                        </div>
                      </TabsContent>
                      <TabsContent value="observability" className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Real-time dashboards</Badge>
                          <Badge variant="outline">Synthetic monitoring</Badge>
                          <Badge variant="outline">Log analytics</Badge>
                          <Badge variant="outline">Topology maps</Badge>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="space-y-4">
                      {activeProducts.map((product) => (
                        <Card key={product.id} className="border-border/60 bg-background/60">
                          <CardHeader>
                            <CardTitle className="text-base">{product.name}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid gap-3 sm:grid-cols-3">
                              {product.mandatory.map((field) => (
                                <div key={field} className="space-y-2">
                                  <p className="text-xs font-semibold text-muted-foreground">{field}</p>
                                  <Input placeholder={`Enter ${field.toLowerCase()}`} />
                                </div>
                              ))}
                            </div>
                            <Accordion type="single" collapsible>
                              <AccordionItem value="optional">
                                <AccordionTrigger className="text-sm">
                                  Optional configuration
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid gap-3 sm:grid-cols-3">
                                    {product.optional.map((field) => (
                                      <div key={field} className="space-y-2">
                                        <p className="text-xs font-semibold text-muted-foreground">
                                          {field}
                                        </p>
                                        <Input placeholder={`Configure ${field.toLowerCase()}`} />
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-border/60 bg-card/80">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI-powered assistance
                      </CardTitle>
                      <CardDescription>
                        Describe requirements or upload documents for instant guidance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder="Describe the solution goals, constraints, and desired outcomes..."
                        className="min-h-[140px]"
                      />
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Upload docs
                        </Button>
                        <Button size="sm" className="gap-2">
                          <Wand2 className="h-4 w-4" />
                          Generate recommendations
                        </Button>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
                        AI will respect selected products, mandatory parameters, and session context.
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/60 bg-card/80">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Output generation
                      </CardTitle>
                      <CardDescription>
                        Preview and download all outputs directly from the workspace.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {OUTPUTS.map((output) => (
                        <div
                          key={output.title}
                          className="flex items-center justify-between rounded-xl border border-border/60 bg-background/60 p-4"
                        >
                          <div>
                            <p className="text-sm font-semibold">{output.title}</p>
                            <p className="text-xs text-muted-foreground">{output.description}</p>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <FileDown className="h-4 w-4" />
                            Preview
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="border-border/60 bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Collaboration & delivery
                  </CardTitle>
                  <CardDescription>
                    Share sessions with teammates and control access securely.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Role-based access</Badge>
                      <Badge variant="outline">Audit trails</Badge>
                      <Badge variant="outline">Shared output packs</Badge>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Input placeholder="Invite collaborator by email" />
                      <Button className="gap-2">
                        Send invite
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center rounded-xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
                    Sessions remain isolated with their own context and outputs.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <Card className="border-border/60 bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      Knowledge base management
                    </CardTitle>
                    <CardDescription>
                      Create and maintain products, parameters, and output templates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add product
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Settings className="h-4 w-4" />
                        Manage templates
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Update catalog
                      </Button>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/60 p-4">
                      <p className="text-sm font-semibold">Active products</p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {PRODUCTS.map((product) => (
                          <div
                            key={product.id}
                            className="rounded-lg border border-border/60 bg-card/70 p-3"
                          >
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.description}</p>
                            <Button variant="ghost" size="sm" className="mt-2 gap-1">
                              Edit details
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/60 bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Real-time operations
                    </CardTitle>
                    <CardDescription>
                      TanStack Query + PostgreSQL keep data current across teams.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/60 p-3">
                        <div>
                          <p className="text-sm font-semibold">PostgreSQL</p>
                          <p className="text-xs text-muted-foreground">Persistent data storage</p>
                        </div>
                        <Badge variant="secondary">Healthy</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/60 p-3">
                        <div>
                          <p className="text-sm font-semibold">Real-time updates</p>
                          <p className="text-xs text-muted-foreground">Query cache warm</p>
                        </div>
                        <Badge variant="secondary">Live</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/60 p-3">
                        <div>
                          <p className="text-sm font-semibold">Replit auth</p>
                          <p className="text-xs text-muted-foreground">SSO enabled</p>
                        </div>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                    </div>
                    <div className="rounded-xl border border-dashed border-border/60 bg-background/60 p-4 text-xs text-muted-foreground">
                      Responsive layout adapts seamlessly across devices and admin workstations.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/60 bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Parameter management
                  </CardTitle>
                  <CardDescription>
                    Edit parameters inline and organize by solution, site, or circuit level.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Mandatory</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {PARAMETERS.map((param) => (
                        <TableRow key={param.name}>
                          <TableCell className="font-medium">{param.name}</TableCell>
                          <TableCell>{param.level}</TableCell>
                          <TableCell>{param.type}</TableCell>
                          <TableCell>{param.required}</TableCell>
                          <TableCell>{param.defaultValue}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/60 bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChevronDown className="h-5 w-5 text-primary" />
                      LOV (List of Values)
                    </CardTitle>
                    <CardDescription>
                      Manage dropdown options for select and multiselect fields.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {LOV_OPTIONS.map((option) => (
                        <Badge key={option} variant="secondary">
                          {option}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add option
                      </Button>
                      <Button size="sm" variant="outline">
                        Manage via dialog
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/60 bg-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileDown className="h-5 w-5 text-primary" />
                      CSV bulk operations
                    </CardTitle>
                    <CardDescription>
                      Download templates, upload parameters, and validate errors in bulk.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <Button size="sm" variant="outline" className="gap-2">
                        <FileDown className="h-4 w-4" />
                        Download template
                      </Button>
                      <Button size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload CSV
                      </Button>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/60 p-3 text-xs text-muted-foreground">
                      Validation highlights missing required fields, mismatched types, and duplicates.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/60 bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Output templates
                  </CardTitle>
                  <CardDescription>
                    Configure output structure and reusable content blocks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  {[
                    "Architecture blueprint",
                    "Sizing workbook",
                    "Executive proposal",
                  ].map((template) => (
                    <div
                      key={template}
                      className="flex h-full flex-col justify-between rounded-xl border border-border/60 bg-background/60 p-4"
                    >
                      <div>
                        <p className="text-sm font-semibold">{template}</p>
                        <p className="text-xs text-muted-foreground">
                          Configure layout, sections, and versioning controls.
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        Configure
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
