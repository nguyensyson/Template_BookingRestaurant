<script lang="tsx">
import { defineComponent, ref } from "vue";
export default defineComponent({
	name : 'LoadingComponent',
	props : {
		loading : {
			type : Boolean,
			default : false
		},
		timeOut : {
			type : Number,
			default : 1
		}
	},
	setup(props){
		const loadingProps = ref(props.loading);
		const timeOut = ref(props.timeOut);
		setTimeout(() => {
			loadingProps.value = false;
		}, timeOut.value * 1000);
		return () => (
			<div>
				{loadingProps.value && (
					<div class="loading">
						<div class="spinner-border spinner-center" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				)}
			</div>
		)
	}
})
</script>

<style>
.loading {
	background: rgba(0, 0, 0, .5);
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
}

.spinner-center {
	top: 50%;
	left: 50%;
	position: absolute;
}
</style>