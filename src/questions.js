export const questions = [
  {
    question: "How are critical compute resources (VMs, App Services) protected from single datacenter failures?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "For maximum resilience, deploy critical resources across multiple Availability Zones. For SLA improvements, use Availability Sets.",
    documentationLink: "https://learn.microsoft.com/azure/availability-zones/az-overview"
  },
  {
    question: "What is the redundancy level for critical data storage (Storage Accounts, Disks)?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Use Zone-Redundant Storage (ZRS) for high availability within a region. Use Geo-Zone-Redundant Storage (GZRS) for regional disaster recovery.",
    documentationLink: "https://learn.microsoft.com/azure/storage/common/storage-redundancy"
  },
  {
    question: "How is the primary database configured for high availability (HA) and disaster recovery (DR)?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "For Azure SQL DB, use Business Critical/Premium tiers with zone-redundancy. For DR, configure active geo-replication or auto-failover groups.",
    documentationLink: "https://learn.microsoft.com/azure/azure-sql/database/high-availability-sla"
  },
  {
    question: "How is user traffic distributed across application instances or regions?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Use Azure Load Balancer (regional) or Azure Application Gateway for Layer 7 features. Use Azure Front Door or Traffic Manager for global routing and failover.",
    documentationLink: "https://learn.microsoft.com/azure/architecture/guide/technology-choices/load-balancing-overview"
  },
  {
    question: "Is there a documented and tested disaster recovery plan for a regional outage?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Implement a DR strategy using Azure Site Recovery for IaaS or native replication features for PaaS services. Regularly test the failover process.",
    documentationLink: "https://learn.microsoft.com/azure/site-recovery/site-recovery-overview"
  },
  {
    question: "How does the application handle transient faults when communicating with other services (e.g., databases, APIs)?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Implement the Retry pattern for transient errors and the Circuit Breaker pattern to prevent repeated calls to a failing service.",
    documentationLink: "https://learn.microsoft.com/azure/architecture/best-practices/transient-faults"
  },
  {
    question: "How does the application handle increases in user traffic? Is autoscaling configured?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Configure autoscaling for App Service Plans or Virtual Machine Scale Sets (VMSS) based on performance metrics like CPU percentage or HTTP queue length.",
    documentationLink: "https://learn.microsoft.com/azure/azure-monitor/autoscale/autoscale-overview"
  },
  {
    question: "How are long-running background tasks processed without impacting the primary application's performance?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Decouple background tasks using a messaging service like Azure Queue Storage or Azure Service Bus, processed by a separate worker role or Azure Function.",
    documentationLink: "https://learn.microsoft.com/azure/service-bus-messaging/compare-messaging-services"
  },
  {
    question: "Is a content delivery network (CDN) used for serving static assets (images, CSS, JavaScript)?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Offload static content to Azure Front Door CDN to reduce latency for users and decrease the load on origin servers.",
    documentationLink: "https://learn.microsoft.com/en-us/azure/frontdoor/create-front-door-portal"
  },
  {
    question: "Is there a caching layer to reduce latency and load on backend data stores?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Implement Azure Cache for Redis for in-memory caching of frequently accessed data.",
    documentationLink: "https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview"
  },
  {
    question: "What performance tiers are being used for databases and storage? Are they appropriate for the workload?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Review and right-size performance tiers (e.g., DTUs/vCores for SQL, Premium tier for Storage Accounts) based on actual usage metrics to balance cost and performance.",
    documentationLink: "https://learn.microsoft.com/azure/azure-sql/database/purchasing-models"
  },
  {
    question: "How are database queries optimized to ensure fast response times?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Use Query Performance Insight for Azure SQL to identify and optimize long-running queries. Ensure proper indexing strategies are in place.",
    documentationLink: "https://learn.microsoft.com/azure/azure-sql/database/query-performance-insight-use"
  },
  {
    question: "How are secrets, keys, and connection strings managed by the application?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Store all secrets in Azure Key Vault. Applications should authenticate using Managed Identities to access the vault, eliminating secrets in code or config.",
    documentationLink: "https://learn.microsoft.com/azure/azure-resource-manager/templates/key-vault-parameter?tabs=azure-cli"
  },
  {
    question: "How is inbound network traffic to the virtual network filtered and secured?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Implement Network Security Groups (NSGs) to filter traffic at the subnet and NIC level. For advanced protection, deploy Azure Firewall or a Network Virtual Appliance (NVA).",
    documentationLink: "https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview"
  },
  {
    question: "Are public endpoints (e.g., Storage, SQL DB) secured to prevent broad internet access?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Use Private Endpoints to bring services into your VNet, or configure Service Endpoints and firewall rules to restrict access to specific virtual networks.",
    documentationLink: "https://learn.microsoft.com/azure/private-link/private-endpoint-overview"
  },
  {
    question: "Is web application traffic inspected for common exploits like SQL injection and cross-site scripting?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Deploy Azure Application Gateway WAF (Web Application Firewall) or Azure Front Door WAF to protect against common web vulnerabilities (OWASP Top 10).",
    documentationLink: "https://learn.microsoft.com/azure/web-application-firewall/overview"
  },
  {
    question: "What level of monitoring and diagnostics is enabled for key services?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Configure Azure Monitor and enable Diagnostic Settings for all critical resources to stream logs and metrics to a Log Analytics workspace.",
    documentationLink: "https://learn.microsoft.com/azure/azure-monitor/overview"
  },
  {
    question: "Are proactive alerts configured for health events, performance degradation, or security issues?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Create Alert Rules in Azure Monitor to proactively notify operations teams of issues like high CPU, failed requests, or specific security events.",
    documentationLink: "https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-log"
  },
  {
    question: "Is Application Performance Monitoring (APM) in place to trace transactions and identify bottlenecks?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Instrument the application with the Application Insights SDK to gain deep insights into request rates, response times, failure rates, and dependencies.",
    documentationLink: "https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview"
  },
  {
    question: "Is Infrastructure as Code (IaC) being used to manage and deploy the Azure environment?",
    options: [
      "Not Implemented",
      "Testing/Considering",
      "Partially Implemented",
      "Mostly Implemented",
      "Fully Implemented and Optimized"
    ],
    recommendedAction: "Use ARM templates or Terraform to define and deploy infrastructure. This ensures consistency, repeatability, and version control.",
    documentationLink: "https://learn.microsoft.com/en-us/azure/developer/terraform/overview"
  }
];