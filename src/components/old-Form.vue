<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex justify-center>
        <v-card height="100%" width="70%" class="mx-auto">
          <v-form color="accent" ref="form" @submit="checkForm">
             <p v-if="errors.length">
               <b>Please correct the following error(s):</b>
                <ul v-for ="(error, i) in errors" :key="i">
                 <li>{{ error }}</li>
                </ul>
             </p> 
            <v-row class="mx-auto">
              <v-col class="d-flex" cols="12" sm="6">
                <v-select v-model="data.category" :items="items" filled label="Category" outlined></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="data.topic" label="Topic" placeholder="Input Topic" outlined></v-text-field>
              </v-col>
            </v-row>
            <h1>Insight on the Topic of Concern</h1>
            <v-row class="ml-3 mr-3">
              <v-textarea
                id="des"
                solo
                class="full-width"
                label="Description"
                rows="6"
                v-model="data.description"
              ></v-textarea>
            </v-row>
            <p>Provide the Address of Concern</p>
            <hr class="ml-12 mr-12" />
            <v-row class="mx-auto">
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="data.city" label="City" placeholder="City" filled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="data.municipality"
                  label="Municipality"
                  placeholder="Municipality"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="data.barangay"
                  label="Barangay"
                  placeholder="Barangay"
                  filled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-flex>
              <v-row>
                <p id="app" class="ml-12">By checking the label below your testimony are true</p>
                <v-checkbox
                  id="checkbox"
                  v-model="checkbox"
                  :label="`All data are Real: ${checkbox.toString()}`"
                  style="margin-right:20%"
                ></v-checkbox>
              </v-row>
            </v-flex>
            <input class="mb-2" color="primary" type="submit" value="Submit" style="background-color:gray; width:70px; height:40px; background-radius:20px" />
            
          </v-form>
       
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data: () => ({
    items: [
      {
        text: "Environment"
      },
      {
        text: "Social"
      },
      {
        text: "Politics"
      },
      {
        text: "Health"
      },
      {
        text: "Education"
      },
      {
        text: "Economy"
      },
      {
        text: "Community Development"
      }
    ],
    checkbox: true,
    radioGroup: 1,
    switch1: true,
     errors:[],
     data: {
      category: "",
      topic: "",
      description: "",
      city: "",
      municipality: "",
      barangay: "",
     }
      
  }),
  methods: {
    checkForm: function(e) {
      if(this.data) return
      axios.post("http://localhost:8081/post",this.data).then(response => {
        alert(response);
        this.data ="";
        this.errors=[];
      });
      this.errors = [];
      if (!this.category) this.errors.push("Category required.");
      if (!this.topic) this.errors.push("Topic required.");
      if (!this.description) this.errors.push("Description required.");
      if (!this.city) this.errors.push("city required.");
      if (!this.municipality) this.errors.push("municipality required.");
      if (!this.barangay) this.errors.push("barangay required.");
      e.preventDefault();
    },
  }
};
</script>

<style>
#checkbox {
  margin-right: 10%;
}
</style>
