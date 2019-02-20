import Vue from 'vue';
import { GChart } from 'vue-google-charts';

document.addEventListener("DOMContentLoaded", () => {
	new Vue({
		el: "#app",
		components: {
			"gchart": GChart
		},
		data: {
			nationalMix: [],
			chartData: [],
			from_date: '',
			from_time: '',
			to_date: '',
			to_time: '',
			from: '',
			to: '',
			from_actual: '',
			to_actual: '',
		},
		methods: {
			joinToFrom: function() {
				this.from = `${this.from_date}T${this.from_time}Z`;
				this.to = `${this.to_date}T${this.to_time}Z`;
			},
			getNationalMix: function() {
				fetch(`https://api.carbonintensity.org.uk/generation/${this.from}/${this.to}`)
				.then(response => response.json())
				.then(data => {
					this.nationalMix = data.data[0].generationmix;
					this.from_actual = data.data[0].from;
					this.to_actual = data.data[0].to;
					this.formatActuals();
				})
				.then(() => this.getChartData())
			},
			getChartData: function () {
				this.chartData = [[],[]]
				for (let i = 0; i < this.nationalMix.length; i++){
					this.chartData[0].push(this.nationalMix[i].fuel);
					this.chartData[1].push(this.nationalMix[i].perc);
				};
			},
			formatActuals: function () {
				this.from_actual = this.from_actual.replace("T", " ");
				this.from_actual = this.from_actual.replace("Z", "");
				this.to_actual = this.to_actual.replace("T", " ");
				this.to_actual = this.to_actual.replace("Z", "");
			}
		},
		mounted: function() {
			// this.getNationalMix();
		}
	});
});
