\# ELQAVON Website Data Model v1.0



Status: Draft



\---



\# Philosophy



The website is configuration-driven.



React components should render data.



Business information belongs in the Configuration Layer.



\---



\# Configuration Layer



brand.js

&#x20;   ↓

company.js

&#x20;   ↓

navigation.js

&#x20;   ↓

capabilities.js

&#x20;   ↓

industries.js

&#x20;   ↓

products.js

&#x20;   ↓

contact.js

&#x20;   ↓

social.js

&#x20;   ↓

seo.js



\---



\# Data Flow



Configuration



↓



Layouts



↓



Pages



↓



Components



↓



UI



\---



\# Home Page



Reads



\- company.js

\- capabilities.js

\- industries.js

\- products.js



Displays



\- Hero

\- Company Summary

\- Featured Capabilities

\- Featured Industries

\- Featured Products

\- Call To Action



\---



\# Company Page



Reads



\- company.js



Displays



\- Story

\- Vision

\- Mission

\- Values

\- Leadership



\---



\# Capabilities Page



Reads



\- capabilities.js



Displays



\- Categories

\- Services

\- Call To Action



\---



\# Solutions Page



Reads



\- industries.js



Displays



\- Industries

\- Industry Challenges

\- ELQAVON Solutions



\---



\# Products Page



Reads



\- products.js



Displays



\- Product Cards

\- Product Details

\- Status



\---



\# Contact Page



Reads



\- company.js

\- contact.js

\- social.js



Displays



\- Contact Information

\- Offices

\- Social Links

\- Contact Form



\---



\# SEO



Every page receives



Default SEO



↓



Page Overrides



↓



Final Metadata



\---



\# Rule



Pages never hardcode business information.



Everything comes from Configuration.



End.
