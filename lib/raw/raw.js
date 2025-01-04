// async session({ session, token }) {
    //   try {
    //     await connectToMongoDB();
    //     if (token?.user && typeof token?.user !== undefined) {
    //       const { email, phone_number } = token.user;
    //       const query = email ? { email } : { phone_number };

    //       const userFromDB = await User.findOne(query); // .lean();

    //       if (userFromDB) session.user = userFromDB;
    //       else session.user = token.user;
    //     }
    //     return session;
    //   } catch (error) {
    //     console.error("Session callback error:", error);
    //     return session;
    //   }
    // },
    // async session({ session, token }) {
    //   await connectToMongoDB();

    //   if (typeof token?.user !== "undefined") {
    //     const userExists = await User.findOne({ email: token?.user?.email });
    //     if (userExists) {
    //       session.user = { authUser: token?.user, user: userExists };
    //     } else {
    //       session.user = { user: token?.user };
    //     }
    //   }
    //   return session.user;
    // },
  



// {/* <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
//               <div className="space-y-4">
//                 <div className="relative">
//                   <label htmlFor="cardNumber" className="block mb-1">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     name="cardNumber"
//                     id="cardNumber"
//                     placeholder="Card Number"
//                     className="w-full p-2 border rounded"
//                     value={billingDetails.cardNumber}
//                     onChange={handleChange}
//                   />
//                   {billingDetails.cardNumber && (
//                     <span
//                       className="absolute right-2 top-8 text-xl cursor-pointer"
//                       onClick={() => clearInput("cardNumber")}
//                     >
//                       &times;
//                     </span>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="relative">
//                     <label htmlFor="expiry" className="block mb-1">
//                       Expiry
//                     </label>
//                     <input
//                       type="text"
//                       name="expiry"
//                       id="expiry"
//                       placeholder="MM/YY"
//                       className="p-2 border rounded w-full"
//                       value={billingDetails.expiry}
//                       onChange={handleChange}
//                     />
//                     {billingDetails.expiry && (
//                       <span
//                         className="absolute right-2 top-8 text-xl cursor-pointer"
//                         onClick={() => clearInput("expiry")}
//                       >
//                         &times;
//                       </span>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label htmlFor="cvv" className="block mb-1">
//                       CVV
//                     </label>
//                     <input
//                       type="text"
//                       name="cvv"
//                       id="cvv"
//                       placeholder="CVV"
//                       className="p-2 border rounded w-full"
//                       value={billingDetails.cvv}
//                       onChange={handleChange}
//                     />
//                     {billingDetails.cvv && (
//                       <span
//                         className="absolute right-2 top-8 text-xl cursor-pointer"
//                         onClick={() => clearInput("cvv")}
//                       >
//                         &times;
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div> */}

// single product create page code

// import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
// import { Fragment, useState } from "react";
// import { Col, Container, Row } from "reactstrap";
// import GeneralForm from "./GeneralForm";
// import MetaDataForm from "./MetaDataForm";
// import VariantForm from "./VariantForm";
// import AdditionalInfoForm from "./AdditionalForm";
// import axios from 'axios';
// import { toast } from "react-toastify";
// import { useRouter } from 'next/navigation';

// interface Variant {
//   flavor: string;
//   images: string[];
//   stock: number;
//   form: "tablet" | "powder" | "liquid";
//   netQuantity: string;
//   nutritionFacts: string[];
//   allergens?: string[];
//   servingSize: string;
// }

// const AddDigitalProduct = () => {
//   const router = useRouter();

//   // General Form
//   const [generalFormState, setGeneralFormState] = useState({
//     price: 0,
//     salePrice: 0,
//     discount: 0,
//     directions: [] as string[],
//     ingredients: [] as string[],
//     benefits: [] as string[],
//     faqs: [] as { question: string; answer: string }[],
//     title: '',
//     description: '',
//     category: {
//       title: '',
//       slug: '',
//     },
//     brand: '',
//     isNew: false,
//     bestBefore: '',
//   });

//   const handleGeneralForm = (field: string, value: any) => {
//     setGeneralFormState((prevState) => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   // Variant Form
//   const [variants, setVariants] = useState<Variant[]>([]);
//   const [newVariant, setNewVariant] = useState<Variant>({
//     flavor: "",
//     images: [],
//     stock: 0,
//     form: "tablet",
//     netQuantity: "",
//     nutritionFacts: [],
//     allergens: [],
//     servingSize: "",
//   });
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
//   const [isUploading, setIsUploading] = useState(false);

//   const variantFormProps = {
//     variants,
//     setVariants,
//     newVariant,
//     setNewVariant,
//     imagePreviews,
//     setImagePreviews,
//     errors,
//     setErrors,
//     isUploading,
//     setIsUploading,
//   };

//   const [additionalInfoStates, setAdditionalInfoStates] = useState({
//     manufacturedBy: '',
//     countryOfOrigin: '',
//     phone: '',
//     email: '',
//   });

//   const handleAdditionalChange = (field: string, value: any) => {
//     setAdditionalInfoStates((prevState) => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   const handleVariantChange = (name: string, value: any) => {
//     setNewVariant({
//       ...newVariant,
//       [name]: value
//     });
//   };

//   const [isPosting, setIsPosting] = useState(false);

//   const handleSave = async () => {
//     // Validate required fields
//     const requiredFields = [
//       'title', 'description', 'category.title', 'category.slug', 'brand', 'price', 'bestBefore'
//     ];
//     const missingFields = requiredFields.filter(field => {
//       const keys = field.split('.');
//       let value: any = generalFormState;
//       keys.forEach((key: string) => {
//         value = value[key as keyof typeof value];
//       });
//       return !value;
//     });

//     if (missingFields.length > 0) {
//       toast.error("Please fill these required fields: " + missingFields.join(", "));
//       return;
//     }

//     if (variants.length === 0) {
//       toast.error("Please add at least one variant.");
//       return;
//     }
//     if (generalFormState.price <= 0 || generalFormState.salePrice <= 0) {
//       toast.error("Price and sale price must be greater than 0.");
//       return;
//     }

//     if (generalFormState.price <= generalFormState.salePrice) {
//       toast.error("Sale price must be less than the price.");
//       return;
//     }

//     setIsPosting(true);

//     const product = {
//       ...generalFormState,
//       variants: variants,
//       additionalInfo: {
//         manufacturedBy: additionalInfoStates.manufacturedBy || " ",
//         countryOfOrigin: additionalInfoStates.countryOfOrigin || " ",
//         phone: additionalInfoStates.phone || " ",
//         email: additionalInfoStates.email || " ",
//       },
//       sku: "some-sku-value", // Add a valid SKU value
//       ratings: 0, // Default value
//       reviews_number: 0, // Default value
//     };

//     try {
//       const response = await axios.post('/api/products/create/create-single', product);
//       console.log(response.data);
//       toast.success("Product created successfully");
//       // Reset all fields
//       setGeneralFormState({
//         price: 0,
//         salePrice: 0,
//         discount: 0,
//         directions: [],
//         ingredients: [],
//         benefits: [],
//         faqs: [],
//         title: '',
//         description: '',
//         category: {
//           title: '',
//           slug: '',
//         },
//         brand: '',
//         isNew: false,
//         bestBefore: '',
//       });
//       setVariants([]);
//       setAdditionalInfoStates({
//         manufacturedBy: '',
//         countryOfOrigin: '',
//         phone: '',
//         email: '',
//       });
//       // Redirect to product list
//       router.push("/en/products/digital/digital-product-list");
//     } catch (error) {
//       console.error("Error creating product:", error);
//       toast.error("Failed to create product");
//     } finally {
//       setIsPosting(false);
//     }
//   };

//   const handleCancel = () => {
//     // Reset all fields
//     setGeneralFormState({
//       price: 0,
//       salePrice: 0,
//       discount: 0,
//       directions: [],
//       ingredients: [],
//       benefits: [],
//       faqs: [],
//       title: '',
//       description: '',
//       category: {
//         title: '',
//         slug: '',
//       },
//       brand: '',
//       isNew: false,
//       bestBefore: '',
//     });
//     setVariants([]);
//     setAdditionalInfoStates({
//       manufacturedBy: '',
//       countryOfOrigin: '',
//       phone: '',
//       email: '',
//     });
//     // Redirect to home page
//     router.push("/");
//   };

//   return (
//     <Fragment>
//       <CommonBreadcrumb title="Add Products" parent="products/digital" element={
//         <div className="d-flex gap-2 justify-content-end ">
//           <button onClick={handleSave} className="btn btn-primary" disabled={isPosting}>
//             {isPosting ? "Creating..." : "Save"}
//           </button>
//           <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
//         </div>
//       } />
//       <Container fluid>
//         <Row className="product-adding">
//           <Col xl="6">
//             <GeneralForm generalFormState={generalFormState} handleGeneralForm={handleGeneralForm} />
//           </Col>
//           <Col xl="6">
//             <VariantForm variantProps={variantFormProps} handleVariantChange={handleVariantChange} />
//             <AdditionalInfoForm additionalInfoStates={additionalInfoStates} handleAdditionalChange={handleAdditionalChange} />
//             {/* <MetaDataForm /> */}
//           </Col>
//         </Row>
//       </Container>
//     </Fragment>
//   );
// };

// export default AddDigitalProduct;


// route.ts code 

// import { NextRequest, NextResponse } from "next/server";
// import { connectToMongoDB } from "@/lib/db";
// import Products from "@/models/Products";
// import { generateSlug } from "@/lib/utils";

// // const generateUniqueSlug = async (slug: string) => {
// //   let uniqueSlug = slug;
// //   let slugExists = await Products.findOne({ "category.slug": uniqueSlug });

// //   let counter = 1;
// //   while (slugExists) {
// //     uniqueSlug = `${slug}-${counter}`;
// //     slugExists = await Products.findOne({ "category.slug": uniqueSlug });
// //     counter++;
// //   }

// //   return uniqueSlug;
// // };

// // Generate a simple 8-digit SKU based on the product count in the database
// const generateSequentialSku = async () => {
//   const productCount = await Products.countDocuments(); // Get the count of all products
//   const skuNumber = (productCount + 1).toString().padStart(8, "0"); // Increment and pad to 8 digits
//   return skuNumber;
// };

// export const POST = async (request: NextRequest) => {
//   try {
//     const {
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       discount,
//       isNew,
//       variants,
//       bestBefore,
//       directions,
//       ingredients,
//       benefits,
//       faqs,
//       additionalInfo,
//     }: {
//       title: string;
//       description: string;
//       category: { title: string; slug: string };
//       brand: string;
//       price: number;
//       salePrice: number;
//       discount?: number;
//       isNew?: boolean;
//       variants: [{
//         flavor: string;
//         images: string[];
//         stock: number;
//         form: "tablet" | "powder" | "liquid";
//         netQuantity: string;
//         nutritionFacts: string[];
//         allergens?: string[];
//         servingSize: string;
//       }];
//       bestBefore: Date;
//       directions: string[];
//       ingredients: string[];
//       benefits: string[];
//       faqs: { question: string; answer: string }[];
//       additionalInfo: {
//         manufacturedBy: string;
//         countryOfOrigin: string;
//         phone: string;
//         email: string;
//       };
//     } = await request.json();

//     await connectToMongoDB();

//     const slug = generateSlug(category.title);
//     // const uniqueSlug = await generateUniqueSlug(slug);

//     const sku = await generateSequentialSku(); // Use the sequential SKU
// let sell_on_google_quantity = 0;
// variants.map((variant) => {
//   sell_on_google_quantity += Number(variant.stock);
// } );
//     const newProduct = new Products({
//       sku,
//       title,
//       description,
//       category: {
//         title: category.title,
//         slug: category.slug
//       },
//       brand,
//       price,
//       salePrice,
//       discount,
//       sell_on_google_quantity,
//       new: isNew,
//       variants,
//       bestBefore,
//       directions,
//       ingredients,
//       benefits,
//       faqs,
//       additionalInfo,
//       ratings: 0, // Default value
//       reviews_number: 0, // Default value
//     });

//     const savedProduct = await newProduct.save();

//     return NextResponse.json(
//       {
//         message: `${savedProduct.title} product created successfully!`,
//         product: savedProduct,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return NextResponse.json(
//       { error: "Failed to create product" },
//       { status: 500 }
//     );
//   }
// };



// multiple product create route.ts 

// import { NextRequest, NextResponse } from "next/server";
// import { connectToMongoDB } from "@/lib/db";
// import Products from "@/models/Products";
// import { generateSlug } from "@/lib/utils";

// class ProductValidationError extends Error {
//   constructor(public productIndex: number, public missingFields: string[]) {
//     super(`Validation failed for product at index ${productIndex}`);
//     this.name = "ProductValidationError";
//   }
// }

// class ProductCreationError extends Error {
//   constructor(public productIndex: number, public originalError: any) {
//     super(`Failed to create product at index ${productIndex}`);
//     this.name = "ProductCreationError";
//   }
// }

// const generateSequentialSku = async () => {
//   const productCount = await Products.countDocuments();
//   return (productCount + 1).toString().padStart(8, "0");
// };

// const validateProductData = (product: any): string[] => {
//   const requiredFields = [
//     "title",
//     "description",
//     "price",
//     "category.title",
//     "category.slug",
//     "brand",
//     "bestBefore",
//     "directions",
//     "ingredients",
//     "benefits",
//     "additionalInfo.manufacturedBy",
//     "additionalInfo.countryOfOrigin",
//     "additionalInfo.phone",
//     "additionalInfo.email",
//   ];

//   const missingFields: string[] = [];

//   for (const field of requiredFields) {
//     const keys = field.split(".");
//     let value = product;

//     for (const key of keys) {
//       value = value?.[key];
//       if (!value) {
//         missingFields.push(field);
//         break;
//       }
//     }
//   }

//   if (!Array.isArray(product.variants) || product.variants.length === 0) {
//     missingFields.push("variants");
//   } else {
//     product.variants.forEach((variant: any, index: number) => {
//       const variantFields = [
//         "flavor",
//         "images",
//         "stock",
//         "form",
//         "netQuantity",
//         "nutritionFacts",
//         "servingSize",
//       ];

//       for (const field of variantFields) {
//         if (!variant[field]) {
//           missingFields.push(`variants[${index}].${field}`);
//         }
//       }
//     });
//   }

//   return missingFields;
// };

// export const POST = async (request: NextRequest) => {
//   try {
//     const products = await request.json();

//     if (!Array.isArray(products) || products.length === 0) {
//       return NextResponse.json(
//         {
//           error: "Invalid input format. Provide a non-empty array of products.",
//         },
//         { status: 400 }
//       );
//     }

//     await connectToMongoDB();
//     const savedProducts = [];
//     const errors: {
//       validation: { productIndex: number; error: string; details: string }[];
//       database: { productIndex: number; error: string; details: string }[];
//       unknown: { productIndex: number; error: string; details: string }[];
//     } = { validation: [], database: [], unknown: [] };

//     console.log(
//       `[${new Date().toISOString()}] Processing ${products.length} products`
//     );

//     for (let index = 0; index < products.length; index++) {
//       try {
//         const product = products[index];
//         console.log(`Validating product at index ${index}: ${product.title}`);

//         const missingFields = validateProductData(product);
//         if (missingFields.length > 0) {
//           throw new ProductValidationError(index, missingFields);
//         }

//         const sku = await generateSequentialSku();
//         const sell_on_google_quantity = product.variants.reduce(
//           (sum: number, variant: any) => sum + Number(variant.stock || 0),
//           0
//         );

//         const newProduct = new Products({
//           sku,
//           ...product,
//           sell_on_google_quantity,
//           variants: product.variants.map((variant: any) => ({
//             ...variant,
//             allergens: variant.allergens || [],
//           })),
//           heroBanner: product.heroBanner || {},
//           dailyRitual: product.dailyRitual || {},
//           ingredientHighlights: product.ingredientHighlights || [],
//           ratings: 0,
//           reviews_number: 0,
//         });

//         const savedProduct = await newProduct.save();
//         savedProducts.push(savedProduct);
//         console.log(`Successfully saved product: ${savedProduct.sku}`);
//       } catch (error: any) {
//         console.error(`Error processing product at index ${index}:`, error);

//         if (error instanceof ProductValidationError) {
//           errors.validation.push({
//             productIndex: index,
//             error: "Validation Error",
//             details: `Missing fields: ${error.missingFields.join(", ")}`,
//           });
//         } else if (
//           error.name === "MongoError" ||
//           error.name === "ValidationError"
//         ) {
//           errors.database.push({
//             productIndex: index,
//             error: "Database Error",
//             details: error.message,
//           });
//         } else {
//           errors.unknown.push({
//             productIndex: index,
//             error: "Unknown Error",
//             details: error.message || "An unexpected error occurred",
//           });
//         }
//       }
//     }

//     const hasErrors = Object.values(errors).some(
//       (errList) => errList.length > 0
//     );
//     const responseStatus = hasErrors ? 207 : 200;

//     console.log(`[${new Date().toISOString()}] Processing complete`);
//     return NextResponse.json(
//       {
//         status: hasErrors ? "partial" : "success",
//         message: hasErrors
//           ? "Some products failed to save"
//           : "All products created successfully!",
//         summary: {
//           total: products.length,
//           succeeded: savedProducts.length,
//           failed: products.length - savedProducts.length,
//         },
//         savedProducts,
//         errors,
//       },
//       { status: responseStatus }
//     );
//   } catch (error: any) {
//     console.error("Critical error in product creation:", error);
//     return NextResponse.json(
//       {
//         error: "Server Error",
//         details: error.message || "An unexpected error occurred",
//         timestamp: new Date().toISOString(),
//       },
//       { status: 500 }
//     );
//   }
// };
