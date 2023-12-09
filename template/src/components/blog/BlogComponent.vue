<script lang="tsx">
import {defineComponent, reactive} from "vue";
import {BlogModel} from "@/base/model/blog.model";
import {getTimeAgo} from "@/plugins/utils";

export default defineComponent({
	name: 'PageComponent',
	props: {
		blog: {
			type: BlogModel,
			required: true
		}
	},
	setup(props) {
		const blog = reactive(props.blog);
		return () => (
			<div class="blog-post">
				<h5 class="blog-post-title">{blog.title}</h5>
				<p class="blog-post-meta">{getTimeAgo(blog.createdAt)}</p>
				<p>{blog.content}</p>
			</div>
		)
	}
})
</script>

<style scoped>

</style>