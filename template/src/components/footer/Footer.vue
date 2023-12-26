<script lang="tsx">
import {defineComponent, ref} from 'vue';
export default defineComponent({
	name: 'FooterComponent',
	props: {
		showFooter: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const isShow = ref(props.showFooter);
		const target = ref('_blank');
		return () => (
			<div>
				{isShow.value && (
					<footer>
						<div class="container">
							<div class="row">
								<div class="col-md-12">
									<div class="inner-content">
										<p>Copyright &copy; 2023 Template by :
											<a href="https://github.com/pudo58" target={target.value}>Sy Son Developer</a></p>
									</div>
								</div>
							</div>
						</div>
					</footer>
				)}
			</div>
		);
	},
});
</script>

<style scoped lang="scss">
#copyright {
	background-color: rgba(0, 0, 0, 0.05);
}

.form-outline {
	border: 1px solid #ced4da;
}

footer {
	text-align: center;
}

footer .inner-content {
	border-top: 1px solid #eee;
	margin-top: 60px;
	padding: 60px 0px;
}

footer .inner-content p {
	text-transform: uppercase;
}

footer .inner-content p a {
	color: #f33f3f;
	margin-left: 3px;
}

</style>
