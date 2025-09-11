# In Quest of Knowledge - Website

A beautiful, minimal website for the biography "In Quest of Knowledge" by Dr. Vibha Dineshkumar Shah. Built with Remix, TypeScript, Tailwind CSS, and Firebase.

## Features

- 📖 **Beautiful Book Showcase** - Elegant presentation of the biography with compelling design
- 🛒 **Order System** - Complete ordering flow with customer details form
- 💰 **M-Pesa Integration** - Manual M-Pesa payment confirmation system
- 📱 **Responsive Design** - Mobile-first design that looks great on all devices
- 🎨 **Custom Design** - Sophisticated color scheme and typography befitting a biography
- 🔥 **Firebase Backend** - Secure order storage and management
- ⚡ **Fast & Modern** - Built with Remix for optimal performance

## Tech Stack

- **Framework**: Remix (React Router v7)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Deployment**: Ready for Vercel/Netlify

## Pages

1. **Homepage** (`/`) - Hero section with book showcase and compelling copy
2. **About** (`/about`) - Detailed information about Dr. Vibha and the book
3. **Testimonials** (`/testimonials`) - Reviews and praise from critics and readers
4. **Order** (`/order`) - Complete order form with edition selection
5. **Payment** (`/payment`) - M-Pesa payment instructions and confirmation
6. **Confirmation** (`/confirmation`) - Order success page with next steps

## Assets

### Book Cover Image
The actual book cover (`cover.png`) is used throughout the website and is located in:
- Source: `C:\_workspace\Repos\inquestofknowledge\images\cover.png`
- Website: `website/public/images/cover.png`

The image is automatically displayed on:
- Homepage hero section with 3D rotation effect
- About page sidebar
- Testimonials page
- Order page summary
- All pages maintain consistent styling and accessibility

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Copy your Firebase config and update `app/lib/firebase.ts`:

   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Firebase Setup

### Firestore Collections

The app uses one main collection:

#### `orders` Collection
```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  edition: 'paperback' | 'hardback';
  quantity: number;
  totalAmount: number;
  mpesaCode?: string;
  mpesaPhone?: string;
  status: 'pending' | 'payment_confirmed' | 'shipped' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
```

### Security Rules

Add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to orders collection
    match /orders/{document} {
      allow read, write: if true;
    }
  }
}
```

## M-Pesa Integration

The current implementation uses a manual M-Pesa confirmation system:

1. Customer places order with shipping details
2. System shows M-Pesa payment instructions
3. Customer makes payment via M-Pesa
4. Customer enters M-Pesa confirmation code
5. Order status updates to "payment_confirmed"

### Payment Flow
- **Pay Bill Number**: 247247 (example - update with actual)
- **Account Number**: INQUESTOFKNOWLEDGE
- **Amount**: Calculated based on edition and quantity

## Customization

### Colors and Branding
Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    // Your primary color palette
  },
  gold: {
    // Your accent color palette
  }
}
```

### Content
- Update book details in route components
- Modify testimonials in `app/routes/testimonials.tsx`
- Change contact information in footer components

### Pricing
Update prices in `app/lib/orders.ts`:

```typescript
const prices = {
  paperback: 2500,  // KSh
  hardback: 3500,   // KSh
};
```

## Deployment

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add Firebase environment variables
4. Deploy

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Add Firebase environment variables

## Order Management

Orders are stored in Firebase Firestore. You can:

1. **View Orders**: Access Firebase Console → Firestore Database
2. **Update Status**: Manually update order status (pending → payment_confirmed → shipped → completed)
3. **Export Data**: Use Firebase tools to export order data

## Support

For questions about the website:
- Email: info@inquestofknowledge.com
- Review the code documentation
- Check Firebase Console for order data

## License

This website is created for the book "In Quest of Knowledge" - A Biography of Late Dr. Vibha Dineshkumar Shah.

© 2025 Dineshkumar Devchand Shah. All rights reserved. Copyright Board No.: RZ79824

---

*Built with ❤️ for preserving the legacy of Dr. Vibha Dineshkumar Shah*
