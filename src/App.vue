<template>
  <div>
    <nav class="flex justify-between px-5 py-5 sm:py-5 sm:px-6 md:px-10 bg-white shadow sticky top-0 z-10">
        <div class="order-first sm:pt-1.5">
            <a href="#">
                <img class="w-52 sm:w-auto" src="./assets/acra-logo-horizontal.png">
            </a>
        </div>
        <div class="order-last sm:p-3 text-lg font-bold text-gray-600">
            <a href="tel:8555092136" class="inline-block">
              <img class="w-8 inline-block mr-1 mt-1 sm:mt-0 sm:mb-1" :src="phoneIcon">
              <div class="hidden sm:inline-block sm:text-2xl">(855) 509-2136</div>
            </a>
        </div>
    </nav>
    <div class="sm:mx-10 md:mx-32 lg:64 xl:mx-96 p-6">

          <div class="bg-gradient-to-b from-blue-900 via-blue-400 to-blue-200">
              <div class="justify-center mb-10">
                  <span class="block">
                      <h3 class="text-white text-center font-semibold mb-5 pl-5 pr-5 pt-14 text-3xl md:text-4xl lg:text-5xl">Looking to Purchase or Refinance?</h3>
                  </span>
                  <span class="block">
                      <h5 class="text-white text-center block pb-10 text-2xl md:text-3xl lg:text-4xl">Let's Get Started!</h5>
                  </span>
                  <img :src="downArrow" alt="down-arrow" class="mx-auto pb-10 animate-bounce" style="width: 50px; height: auto;" />
              </div>
          </div>
          <!--Step Indicators-->
          <steps :steps="5" :step="step" class="mb-10"></steps>

      <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
        <div class="flex justify-center" >
          <FormStep>
          <div class="flex justify-center mb-5">
            <h2 class="font-semibold text-2xl mb-5">I'm interested in...</h2>
          </div>
            <div class="flex flex-nowrap">{{ stepOne() }}
              <div class="inline-block w-36 mx-5">
                  <div class="text-center mb-7">
                    <label for="Purchase" class="cursor-pointer" :class="{'text-white' : checked === 'Purchase' }">
                      <div class="mb-1 border-2 rounded-xl border-blue-100 shadow-xl p-5 py-6 cursor-pointer" :class="{'border-2 rounded-xl border-blue-900 bg-blue-300 shadow-xl p-5' : checked === 'Purchase'}">
                        <img :src="checked === 'Purchase' ? purchaseSelected : purchase" alt="Purchase" class="mx-auto w-16" />
                        Purchase
                      </div>
                    </label>
                    <Field
                      name="loan_type"
                      type="radio"
                      id="Purchase"
                      value="Purchase"
                      v-model="checked"
                      class="appearance-none"
                    />
                </div>
              </div>
              <div class="inline-block w-36 mx-5">
                  <div class="text-center mb-7">
                    <label for="Refinance" class="cursor-pointer" :class="{'text-white' : checked === 'Refinance' }">
                      <div class="mb-2 border-2 rounded-xl border-blue-100 shadow-xl p-5 py-6 cursor-pointer" :class="{'border-2 rounded-xl border-blue-900 bg-blue-300 shadow-xl p-5' : checked === 'Refinance'}">
                        <img :src="checked === 'Refinance' ? refinanceSelected : refinance" alt="refinance" class="mx-auto w-16" />
                        Refinance
                      </div>
                    </label>
                    <Field
                      name="loan_type"
                      type="radio"
                      id="Refinance"
                      value="Refinance"
                      v-model="checked"
                      class="appearance-none"
                    />
                  </div>
              </div>
            </div>
            <div class="flex justify-center mb-5">
              <ErrorMessage name="loan_type" class="text-red-600 animate-pulse" />
            </div>
          </FormStep>
        <FormStep>{{ stepTwo() }}
          <div class="flex justify-center mb-5">
          <h2 class="font-semibold text-2xl">Loan Amount Range</h2>
          </div>
          <img :src="moneyBag" alt="Money" class="mx-auto" style="width: 50px; height: auto;">
            <Field name="loan_amount" as="select" @input="noOffer($event.target.value)" class="w-80 h-10 pl-3 pr-6 text-base placeholder-gray-600 border-2 border-blue-300 focus:outline-none focus:ring focus:ring-blue-900 mb-24" v-model="selected">
              <option disabled selected value>Select Amount</option>
              <option v-for="amount in loanAmounts" :value="amount.amount" :key="amount.id">{{ amount.amount }}</option>
            </Field>
            <div class="flex justify-center mb-5">
              <ErrorMessage name="loan_amount" class="text-red-600 animate-pulse" />
            </div>
          </FormStep>

        <FormStep>{{ stepThree() }}
          <div class="flex justify-center mb-5">
          <h2 class="font-semibold text-2xl">Property State</h2>
          </div>
          <img :src="locatorIcon" alt="Locator" class="mx-auto" style="width: 50px; height: auto;">
            <Field name="state" as="select" class="w-80 h-10 pl-3 pr-6 text-base placeholder-gray-600 border-2 border-blue-300 focus:outline-none focus:ring focus:ring-blue-900 mb-24" v-model="selected2">
              <option disabled selected value>Select State</option>
              <option v-for="state in States" :value="state.id" :key="state.id">{{ state.name }}</option>
            </Field>
            <div class="flex justify-center mb-5">
              <ErrorMessage name="state" class="text-red-600 animate-pulse" />
            </div>
          </FormStep>

          <FormStep class="mb-10">{{ stepFour() }}
          <div class="flex justify-center mb-5">
            <h2 class="font-semibold text-2xl">Your Name</h2>
          </div>
            <img :src="idCardIcon" alt="Info Card" class="mx-auto" style="width: 50px; height: auto;">
              <Field name="first_name" type="text" class="w-80 h-10 pl-3 pr-6 text-base placeholder-gray-600 border-2 border-blue-300 focus:outline-none focus:ring focus:ring-blue-900 mb-5" placeholder="First Name" />
              <ErrorMessage name="first_name" class="text-red-600 animate-pulse" />

              <Field name="last_name" type="text" class="w-80 h-10 pl-3 pr-6 text-base placeholder-gray-600 border-2 border-blue-300 focus:outline-none focus:ring focus:ring-blue-900 mb-4" placeholder="Last Name" />
              <ErrorMessage name="last_name" class="text-red-600 animate-pulse" />
          </FormStep>

          <FormStep class="mb-10">{{ stepFive() }}
          <div class="flex justify-center mb-5">
            <h2 class="font-semibold text-2xl">Phone Number & E-mail</h2>
          </div>
            <img :src="phoneEmailIcon" alt="Phone Email" class="mx-auto" style="width: 50px; height: auto;">
              <Field name="phone_number" type="text" class="w-80 h-10 pl-3 pr-6 text-base placeholder-gray-600 border-2 border-blue-300 focus:outline-none focus:ring focus:ring-blue-900 mb-5" placeholder="Phone Number" />
              <ErrorMessage name="phone_number" class="text-red-600 animate-pulse" />

              <Field name="email" type="email" class="w-80 h-10 pl-3 pr-6 text-base placeholder-gray-600 border-2 border-blue-300 focus:outline-none focus:ring focus:ring-blue-900 mb-4" placeholder="Email Address" />
              <ErrorMessage name="email" class="text-red-600 animate-pulse" />
          </FormStep>
        </div>

      </FormWizard>

          <footer>
            <div class="container">
              <div class="pt-8 pb-3">
                <a href="https://www.hud.gov/" target="_blank">
                  <img src="./assets/hud-logo.png" class="inline-block" style="width: 45px; height: auto;" alt="Equal Housing Opportunity">
                </a>
                <a href="https://nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/144549" target="_blank">
                  <img src="./assets/nmls-consumer-access.png" class="inline-block" style="width: 150px; height: auto;" alt="NMLS Consumer Access">
                </a>
              </div>
              <p class="text-xs">Acra Lending is a registered dba of Citadel Servicing Corporation. NMLS ID 144549.<br><br>Alabama Consumer Credit License # 22078, Arkansas Combination Mortgage Banker-Broker-Servicer License # 109106, California – Department of Financial Protection and Innovation Financing Law License # 60DBO94450, California – Department of Financial Protection and Innovation Residential Mortgage Lending Act License # 41DBO-74196, California - DRE Real Estate Corporation License Endorsement License #1799059, Colorado Mortgage Company Registration, Connecticut Mortgage Lender License # ML-144549, Delaware Lender License# 20322, District of Columbia Mortgage Lender License #MLB144549, Florida Mortgage Lender Servicer License # MLD523, Georgia Mortgage Lender License/Registration #23462, Illinois Residential Mortgage License # MB.6761204, Indiana-DFI Mortgage Lending License # 30531, Kansas Mortgage Company License #MC.0025274, Kentucky Mortgage Company License # MC327787, Louisiana Residential Mortgage Lending License, Maine Supervised Lender License #144549, Maryland Mortgage Lender License # 18483, Michigan 1st Mortgage Broker/Lender/Servicer License #FL0020685, Minnesota Residential Mortgage Originator License Other Trade Name #1 MN-MO-144549.1, Montana Mortgage Lender License # 144549, Nebraska Mortgage Banker License, New Hampshire Mortgage Banker License # 21139-MB, New Jersey Residential Mortgage Lender License, North Carolina Mortgage Lender License # L-160722, Ohio Residential Mortgage Lending Act Certificate of Registration RM.804651.000, Oklahoma Mortgage Lender License - Other Trade Name #1 ML013105, Oregon Mortgage Lending License # ML-5599, Pennsylvania Mortgage Lender License # 51804, South Carolina-BFI Mortgage Lender/Servicer License - Other Trade Name #1 MLS - 144549 OTN #1, Tennessee Mortgage License # 125315, Texas - SML Mortgage Company License, Utah-DRE Mortgage Entity License - Other Trade Name #1 12074249, Vermont Lender License - Other Trade Name #1 7601, Virginia Lender License # MC-5845, Washington Consumer Loan Company License #CL-144549, Wisconsin Mortgage Banker License # 144549BA, Wyoming Mortgage Lender/Broker License #3781.<br><br>Acra Lending is an equal opportunity lender.<br><br>Rates, terms, conditions, and programs are subject to change without notice. Offer of credit subject to credit approval per applicable underwriting and program guidelines, applicant eligibility, and market conditions. Not all applicants may qualify.<br><br>Restrictions may apply. Not valid in the following states AK, AZ, HI, IA, MS, MO, NV, NM, NY, ND, RI, SD, and WV.</p>
            </div>
          </footer>
    </div>
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import FormWizard from "@/components/FormWizard.vue";
import FormStep from "@/components/FormStep.vue";
import Steps from "@/components/Steps.vue";

import purchase from "@/assets/purchase.svg";
import purchaseSelected from "@/assets/purchase-white.svg";
import refinance from "@/assets/refinance.svg";
import refinanceSelected from "@/assets/refinance-white.svg";
import downArrow from "@/assets/arrow-down.png";
import moneyBag from "@/assets/money.svg";
import idCardIcon from "@/assets/id.svg";
import locatorIcon from "@/assets/map.svg";
import phoneEmailIcon from "@/assets/phone-email.svg";
import phoneIcon from "@/assets/phone-alt-solid.svg";

import axios from 'axios'
import qs from 'qs'

const loanAmounts = [
    {"id": 1, "amount": "$0 - $99,000"},
    {"id": 2, "amount": "$100,000 - $299,999"},
    {"id": 3, "amount": "$300,000 - $499,999"},
    {"id": 4, "amount": "$500,000 - $799,999"},
    {"id": 5, "amount": "$800,000 - $999,999"},
    {"id": 6, "amount": "$1,000,000"}
]

const States = [
  {"id": "AL", "name": "Alabama"},
  {"id": "AK", "name": "Alaska"},
  {"id": "AZ", "name": "Arizona"},
  {"id": "AR", "name": "Arkansas"},
  {"id": "CA", "name": "California"},
  {"id": "CO", "name": "Colorado"},
  {"id": "CT", "name": "Connecticut"},
  {"id": "DE", "name": "Delaware"},
  {"id": "DC", "name": "District Of Columbia"},
  {"id": "FL", "name": "Florida"},
  {"id": "GA", "name": "Georgia"},
  {"id": "HI", "name": "Hawaii"},
  {"id": "ID", "name": "Idaho"},
  {"id": "IL", "name": "Illinois"},
  {"id": "IN", "name": "Indiana"},
  {"id": "IA", "name": "Iowa"},
  {"id": "KS", "name": "Kansas"},
  {"id": "KY", "name": "Kentucky"},
  {"id": "LA", "name": "Louisiana"},
  {"id": "ME", "name": "Maine"},
  {"id": "MD", "name": "Maryland"},
  {"id": "MA", "name": "Massachusetts"},
  {"id": "MI", "name": "Michigan"},
  {"id": "MN", "name": "Minnesota"},
  {"id": "MS", "name": "Mississippi"},
  {"id": "MO", "name": "Missouri"},
  {"id": "MT", "name": "Montana"},
  {"id": "NE", "name": "Nebraska"},
  {"id": "NV", "name": "Nevada"},
  {"id": "NH", "name": "New Hampshire"},
  {"id": "NJ", "name": "New Jersey"},
  {"id": "NM", "name": "New Mexico"},
  {"id": "NY", "name": "New York"},
  {"id": "NC", "name": "North Carolina"},
  {"id": "ND", "name": "North Dakota"},
  {"id": "OH", "name": "Ohio"},
  {"id": "OK", "name": "Oklahoma"},
  {"id": "OR", "name": "Oregon"},
  {"id": "PA", "name": "Pennsylvania"},
  {"id": "RI", "name": "Rhode Island"},
  {"id": "SC", "name": "South Carolina"},
  {"id": "SD", "name": "South Dakota"},
  {"id": "TN", "name": "Tennessee"},
  {"id": "TX", "name": "Texas"},
  {"id": "UT", "name": "Utah"},
  {"id": "VT", "name": "Vermont"},
  {"id": "VA", "name": "Virginia"},
  {"id": "WA", "name": "Washington"},
  {"id": "WV", "name": "West Virginia"},
  {"id": "WI", "name": "Wisconsin"},
  {"id": "WY", "name": "Wyoming"},
]

export default {
  name: "App",
  components: {
    FormWizard,
    FormStep,
    Field,
    ErrorMessage,
    Steps
  },
  setup() {
    // break down the validation steps into multiple schemas
    const validationSchema = [
      yup.object({
        loan_type: yup
          .string()
          .required()
          .oneOf(["Purchase", "Refinance"], "Choose an option"),
      }),
      yup.object({
        loan_amount: yup
          .string()
          .required("Choose a range")
          .notOneOf([
            "Select Amount"
            ]),
      }),
      yup.object({
        state: yup
          .string()
          .required("State Required")
          .notOneOf([
            "Select State",]),
      }),
      yup.object({
        first_name: yup.string().required().label("First Name"),
        last_name: yup.string().required().label("Last Name"),
      }),
      yup.object({
        phone_number: yup.string().required().label("Phone"),
        email: yup.string().required().email().label("Email Address"),
      })
    ];

    /**
     * Only Called when the last step is submitted
     */
    async function onSubmit(formData) {
      // console.log(JSON.stringify(formData, null, 2));
      const options = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(formData),
        url: 'https://secure.velocify.com/Import.aspx?Provider=CSCWebLeadRetailPages&Client=31215&CampaignId=58'
      }
      try {
        let res = await axios(options)
        console.log(res.data)
        location.href = 'https://acralending.com/thankyou';
      } catch (err) {
        console.error(err)
      }
      // https://secure.velocify.com/Import.aspx?Provider=CSCWebLeadRetailPages&Client=31215&CampaignId=58
      // https://secure.velocify.com/Import.aspx?Provider=CSCWebLeadRetailPages&Client=31215&CampaignId=59
    }

    return {
      validationSchema,
      onSubmit,
      purchase,
      purchaseSelected,
      refinance,
      refinanceSelected,
      downArrow,
      moneyBag,
      idCardIcon,
      locatorIcon,
      phoneEmailIcon,
      phoneIcon
    };
  },

  data() {
    return {
      checked: null,
      step: 1,
      selected: "",
      selected2: "",
      loanAmounts,
      States
    }
  },
  methods: {
    stepOne() {
      this.step = 1;
    },
    stepTwo() {
      this.step = 2;
    },
    stepThree() {
      this.step = 3;
    },
    stepFour() {
      this.step = 4;
    },
    stepFive() {
      this.step = 5;
    },
    noOffer(value) {
      if (value === "$0 - $99,000") {
        alert('We do not offer loans below $99,000');
      }
    }
  }
};
</script>

<style>
#app {
  background-color: #f8f8f8;
  color: #1F2937;
}

input,
select {
  margin: 10px 0;
  display: block;

}
/* input[type="radio"] {
  margin: 10px auto;
  width: 20px;
  height: 40px;
} */
</style>