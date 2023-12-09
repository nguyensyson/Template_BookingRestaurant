<script lang="tsx">
import {defineComponent, ref} from "vue";

export default defineComponent({
	name: 'PageComponent',
	props: {
		page: {
			type: Number,
			default: 0
		},
		totalPage: {
			type: Number,
			default: 0
		},
		pageChange: {
			type: Function,
			default: () => {
			}
		}
	},
	setup(props) {
		let page = ref(props.page);
		const totalPage = ref(props.totalPage);
		const pageChange = (page: number) => {
			props.pageChange(page);
		}
		return () => (
			<div>
				<ul class="pages">
					<li>
						<a role="button" onClick={() => pageChange(--page.value)}>
							<i class="fa fa-angle-double-left"></i>
						</a>
					</li>
					{Array.from({ length: totalPage.value }, (_, index) => index + 1).map(
						(pageNumber, index) => {
							if (
								(index < 5 && page.value < 5) ||
								(index >= page.value - 2 && index <= page.value + 2) ||
								(index > totalPage.value - 5)
							) {
								return (
									<li key={pageNumber} class={page.value === pageNumber ? 'active' : ''}>
										<a role="button" onClick={() => {page.value = pageNumber;pageChange(--pageNumber)}}>
											{pageNumber}
										</a>
									</li>
								);
							} else if ((index === 5 && page.value >= 5) || (index === totalPage.value - 5)) {
								return <li key={index}>&hellip;</li>;
							}
							return null;
						}
					)}
					<li>
						<a role="button" onClick={() => pageChange(++page.value)}>
							<i class="fa fa-angle-double-right"></i>
						</a>
					</li>
				</ul>
			</div>
		);

	}
})
</script>

<style scoped>
ul.pages {
	margin-top: 30px;
	text-align: center;
}

ul.pages li {
	display: inline-block;
	margin: 0px 2px;
}

ul.pages li a {
	width: 44px;
	height: 44px;
	display: inline-block;
	line-height: 42px;
	border: 1px solid #eee;
	font-size: 15px;
	font-weight: 700;
	color: #121212;
	transition: all .3s;
}

ul.pages li a:hover,
ul.pages li.active a {
	background-color: #f33f3f;
	border-color: #f33f3f;
	color: #fff;
}
.filters ul li.active,
.filters ul li:hover {
	color: #f33f3f;
}
</style>