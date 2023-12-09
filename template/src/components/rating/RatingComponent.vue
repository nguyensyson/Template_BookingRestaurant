<script lang="tsx">
import {defineComponent, ref} from "vue";
export default defineComponent({
	name: 'RatingComponent',
	props: {
		rating: {
			type: Number,
			default: 0,
		},
	},
	setup(props) {
		const rating = ref(props.rating);
		if (rating.value > 5) rating.value = 5;
		let stars = [] as any[];
		for (let  i = 0; i < 5; i++) {
			if (i < rating.value) {
				stars.push(<li class="fa fa-star yellow"/>);
			} else {
				stars.push(<li class="fa fa-star dark"/>);
			}
		}
		return () => (
			<div>
				{stars}
			</div>
		)
	}
});
</script>

<style>
.yellow {
	color: #ffc107;
}
.dark {
	color: #343a40;
}
</style>