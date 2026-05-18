# WEDOIT Insurance - Project TODO

## Core Features

### Database & Backend
- [x] Create quote_requests table schema
- [x] Create contact_submissions table schema
- [x] Add tRPC procedures for quote submission
- [x] Add tRPC procedures for contact form submission
- [x] Implement owner notification system for new submissions

### Pages & Navigation
- [x] Home page with hero, CTAs, and trust bar
- [x] About page with founder story and credentials
- [x] Services page with 6 dedicated service sections
- [x] Contact page with form and booking integration
- [ ] Blog/Resources page structure
- [x] Navigation menu with correct routing
- [x] Footer with disclosures and contact details

### Lead Capture & Forms
- [x] Quote form component (embedded, no external form)
- [x] Contact form component
- [x] Form validation and error handling
- [x] Privacy notes on forms
- [x] Confirmation messages after submission
- [x] Form submission to database

### Trust & Credibility
- [x] Trust bar on homepage (4 items)
- [x] Statistics display (500+ families, 15+ years, etc.)
- [x] Testimonials section with names and states
- [x] Credentials and licensing block on About page
- [x] Independent broker disclosure
- [x] License/state availability notice in footer

### Design & Styling
- [x] Define color palette (elegant, financial services)
- [x] Typography system (professional fonts)
- [x] Button styling (primary and secondary CTAs)
- [x] Responsive mobile-first design
- [x] Spacing and layout system
- [x] Component library setup

### Responsive & Polish
- [x] Mobile responsiveness testing
- [x] Desktop layout refinement
- [x] CTA button consistency across all pages
- [x] Navigation menu responsive behavior
- [x] Footer responsive layout
- [x] Loading states and animations

### Notifications & Admin
- [x] Owner email notification on quote submission
- [x] Owner email notification on contact form submission
- [x] Notification content and formatting

### Final Delivery
- [x] Full site testing
- [ ] Performance optimization (address bundle size warning)
- [ ] Accessibility review (keyboard nav, focus states, ARIA)
- [x] Create checkpoint and prepare for publish


## Remaining Tasks

### Navigation & Routing Gaps
- [x] Add Resources navigation item with Blog, Podcast, Videos routes
- [x] Create Blog page with placeholder content
- [x] Create Podcast page with placeholder content
- [x] Create Videos page with placeholder content
- [x] Replace footer placeholder links with real routes

### CTA Consistency
- [x] Verify all CTA buttons use exact required wording
- [x] Ensure "Get My Free Life Insurance Quote" is primary CTA
- [x] Ensure "Book a Free Policy Review" is secondary CTA

### Form Enhancements
- [ ] Add embedded quote form directly on homepage (in addition to modal)
- [ ] Handle notifyOwner failure cases with fallback
- [ ] Add error logging for missed owner notifications

### Testing & Validation
- [x] Form submission testing (quote and contact forms)
- [x] Mobile responsiveness testing (viewport checks)
- [x] End-to-end route testing
- [x] Link validation across all pages

### CTA Wording Normalization
- [x] Ensure all primary CTAs use: "Get My Free Life Insurance Quote"
- [x] Ensure all secondary CTAs use: "Book a Free Policy Review"
- [x] Update navigation "Book a Review" to "Book a Free Policy Review"
- [x] Update footer Terms of Service and Accessibility links (or remove placeholders)
