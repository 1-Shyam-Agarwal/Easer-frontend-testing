// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaStarOfLife } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import "./VendorPriceForm.css"

// const VendorPriceForm = ({ idx , priceSchema, setShowPriceModel, setPriceSchema,singlePriceScheme , setSinglePriceScheme }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const {
//     register ,
//     handleSubmit,
//     getValues,
//     reset,
//     formState: { errors, isSubmitSuccessful} ,
//     watch
//   } = useForm({
//     mode:"onChange",
//     defaultValues: {
//       colour: singlePriceScheme?.colour || "blackAndWhite",
//       printingMethod: singlePriceScheme?.printingMethod || "singleSide",
//       rangeType:singlePriceScheme?.rangeType || "range",
//       aboveValue : singlePriceScheme?.aboveValue || 10,
//       startingRange: singlePriceScheme?.startingRange || 1,
//       endingRange: singlePriceScheme?.endingRange || 10,
//       pricingMethod: singlePriceScheme?.pricingMethod || "perPrint",
//       price: singlePriceScheme?.price || 5
//     },
//     shouldUnregister : true
//   });

//   const rangeTypeValue = watch("rangeType");

//   const submitHandler = (data) => {
//     setIsSubmitting(true);
//     setPriceSchema(prev=>[...prev , data]);
//     setIsSubmitting(false);
//     reset();
//     setShowPriceModel(false);
//   };

//   function saveChangesHandler(data)
//   {
//      setIsSubmitting(true);
//       let temp = [...priceSchema];
//       temp[singlePriceScheme?.["idx"]] = data;
//       setPriceSchema(temp);
//       setIsSubmitting(false);
//       setShowPriceModel(false);
//       reset();
//       setSinglePriceScheme(null);
//   }

//   const cancelHandler = () => {
//     setShowPriceModel(false);
//     if(singlePriceScheme) setSinglePriceScheme(null);
//   };

//   return (
//     <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/50'>
//       <div className="w-full max-w-2xl p-6 bg-white shadow-xl rounded-[2px]">
//         <form onSubmit={!singlePriceScheme ? handleSubmit(submitHandler) : handleSubmit(saveChangesHandler)} className="space-y-6">
//           <div className="grid md:grid-cols-2 gap-4">
//             {/* Colour Selection */}
//             <div className="form-group">
//               <label htmlFor='colour' className="form-label">
//                 Colour
//                 <FaStarOfLife className="text-red-500 text-[6px] ml-1 inline-block"/>
//               </label>
//               <select
//                 id='colour'
//                 className="form-input"
//                 {...register("colour", {
//                   required: "Colour is required",
//                   validate : (value)=>{
//                             return ((value==="blackAndWhite" || value==="colour") ? true : "Invalid Value");
//                           }
//                 })}
//               >
//                 <option value="">Select Colour</option>
//                 <option value="blackAndWhite">Black & White</option>
//                 <option value="colour">Colour</option>
//               </select>
//               {errors.colour && <p className="form-error">{errors.colour.message}</p>}
//             </div>

//             {/* Printing Mode Selection */}
//             <div className="form-group">
//               <label htmlFor='printingMode' className="form-label">
//                 Printing Mode
//                 <FaStarOfLife className="text-red-500 text-[6px] ml-1 inline-block"/>
//               </label>
//               <select
//                 id="printingMode"
//                 className="form-input"
//                 {...register("printingMethod", {
//                   required: "Printing mode is required" ,
//                   validate : (value)=>{
//                     return ((value==="singleSide" || value==="backToBack") ? true : "Invalid Value");
//                   }
//                 })}
//               >
//                 <option value="">Select Mode</option>
//                 <option value="singleSide">Single Side</option>
//                 <option value="backToBack">Back to Back</option>
//               </select>
//               {errors.printingMethod && <p className="form-error">{errors.printingMethod.message}</p>}
//             </div>
//           </div>

//           {/* specify the range */}
//           <div className="form-group">
//             <label htmlFor='rangeType' className="form-label">
//                 Range type
//                 <FaStarOfLife className="text-red-500 text-[6px] ml-1 inline-block"/>
//             </label>
//             <select id="rangeType"
//                     className="form-input"
//                     {...register("rangeType",{required:"Required",
//                       validate:(value)=>{
//                         return (value==="range" || value==="above") ? true : "Invalid value"
//                       }
//                     })}>
//               <option value="">select</option>
//               <option value="range">Range</option>
//               <option value="above">Above</option>
//             </select>
//             {errors.rangeType && <p className="form-error">{errors.rangeType.message}</p>}
//           </div>

//           {/* Specify Above Value */}

//           {
//             rangeTypeValue === "above" &&
//             (
//               <div className="form-group">
//                 <label htmlFor='aboveValue' className="form-label">Specify Above value</label>
//                 <input
//                   type="number"
//                   id="aboveValue"
//                   className="form-input"
//                   {...register("aboveValue", {
//                     required: "Required",
//                     valueAsNumber: true,
//                     min: { value: 1, message: "Value must be greater than zero" }
//                   })}
//                 />
//                 {errors.aboveValue && <p className="form-error">{errors.aboveValue.message}</p>}
//               </div>
//             )
//           }

//           {/* Range Selection */}
//           {
//              rangeTypeValue==="range" &&
//              (
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="form-group">
//                   <label htmlFor='startingRange' className="form-label">Starting Range</label>
//                   <input
//                     type="number"
//                     id="startingRange"
//                     className="form-input"
//                     {...register("startingRange", {
//                       required: "Starting range is required",
//                       valueAsNumber: true,
//                       min: { value: 1, message: "Value must be greater than zero" },
//                       validate: (value) =>
//                         value <= getValues("endingRange") ||
//                         "Starting range must be less than or equal to ending range" ,
//                       validate :(value) => ((getValues("printingMethod") === "backToBack") ? (value >1 ? true : "Value must be greater than 1 in case of Back to Back") : true)
//                     })}
//                   />
//                   {errors.startingRange && <p className="form-error">{errors.startingRange.message}</p>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="endingRange" className="form-label">Ending Range</label>
//                   <input
//                     type="number"
//                     id="endingRange"
//                     className="form-input"
//                     {...register("endingRange", {
//                       required: "Ending range is required",
//                       valueAsNumber: true,
//                       min: { value: 1, message: "Value must be greater than zero" },
//                       validate: (value) =>
//                         value >= getValues("startingRange") ||
//                         "Ending range must be greater than or equal to starting range"
//                     })}
//                   />
//                   {errors.endingRange && <p className="form-error">{errors.endingRange.message}</p>}
//                 </div>
//               </div>
//              )
//           }

//           <div className="grid md:grid-cols-2 gap-4">
//             {/* Pricing Method */}
//             <div className="form-group">
//               <label htmlFor='pricingMethod' className="form-label">Pricing Method</label>
//               <select
//                 id="pricingMethod"
//                 className="form-input"
//                 {...register("pricingMethod", {
//                   required: "Pricing method is required",
//                   validate : (value)=>{
//                     return ((value==="perPrint" || value==="combined") ? true : "Invalid Value");
//                   }
//                 })}
//               >
//                 <option value="">Select</option>
//                 <option value="perPrint">Per Print</option>
//                 <option value="combined">Combined</option>
//               </select>
//               {errors.pricingMethod && <p className="form-error">{errors.pricingMethod.message}</p>}
//             </div>

//             {/* Price Input */}
//             <div className="form-group">
//               <label htmlFor='price' className="form-label">Price</label>
//               <input
//                 type="number"
//                 id="price"
//                 placeholder="Enter price"
//                 className="form-input"
//                 {...register("price", {
//                   required: "Price is required",
//                   valueAsNumber:true,
//                   min: { value: 1, message: "Price must be greater than zero" }
//                 })}
//               />
//               {errors.price && <p className="form-error">{errors.price.message}</p>}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end space-x-4 mt-6">
//             <button
//               type="button"
//               onClick={cancelHandler}
//               className="btn btn-secondary"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             {
//                 !singlePriceScheme ?
//                 (
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Submitting...' : 'Confirm'}
//                   </button>
//                 )
//                 :
//                 <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
//                   </button>
//             }

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VendorPriceForm;
