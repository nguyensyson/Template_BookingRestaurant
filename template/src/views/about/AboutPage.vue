<script lang="tsx">
import {defineComponent} from "vue";
import HeaderComponent from "@/components/header/Header.vue";
import {TeamManagerModel} from "@/base/model/team-manager.model";
import FooterComponent from "@/components/footer/Footer.vue";
import OurCustomerComponent from "@/components/our-customer/OurCustomerComponent.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";
export default defineComponent({
	name: 'AboutPage',
	components: {
		HeaderComponent,
		FooterComponent,
		OurCustomerComponent,
		LoadingComponent
	},
	setup() {
		const teamManagerList = [
			{
				name: 'Johnny William',
				role: 'CO-Founder',
				image: 'src/assets/images/team_01.jpg',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.',
			},
			{
				name: 'Karry Pitcher',
				role: 'Product Expert',
				image: 'src/assets/images/team_02.jpg',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.',
			},
			{
				name: 'Michael Soft',
				role: 'Chief Marketing',
				image: 'src/assets/images/team_03.jpg',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.',
			},
			{
				name: 'Mary Cool',
				role: 'Product Specialist',
				image: 'src/assets/images/team_04.jpg',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.',
			},
			{
				name: 'George Walker',
				role: 'Product Photographer',
				image: 'src/assets/images/team_05.jpg',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.',
			},
			{
				name: 'Kate Town',
				role: 'General Manager',
				image: 'src/assets/images/team_06.jpg',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.',
			},
		] as TeamManagerModel[];
		const headerImage = (
			<div class="page-heading about-heading header-text">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="text-content">
								<h4>about us</h4>
								<h2>our company</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
		const aboutFeature = (
			<div class="best-features about-features">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="section-heading">
								<h2>Our Background</h2>
							</div>
						</div>
						<div class="col-md-6">
							<div class="right-image">
								<img src="src/assets/images/feature-image.jpg" alt=""/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="left-content">
								<h4>Who we are &amp; What we do?</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum
									consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus
									reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat.
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br/><br/>Lorem ipsum
									dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia
									corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut,
									in eum facere corrupti necessitatibus perspiciatis quis.</p>
								<ul class="social-icons">
									<li><a href="#"><i class="fa fa-facebook"></i></a></li>
									<li><a href="#"><i class="fa fa-twitter"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
		const teamMember = (
			<div class="team-members">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="section-heading">
								<h2>Member</h2>
							</div>
						</div>
						{teamManagerList.map((item) => (
							<div class="col-md-4">
								<div class="team-member">
									<div class="thumb-container">
										<img src={item.image} alt=""/>
										<div class="hover-effect">
											<div class="hover-content">
												<ul class="social-icons">
													<li><a href="#"><i class="fa fa-facebook"></i></a></li>
													<li><a href="#"><i class="fa fa-twitter"></i></a></li>
												</ul>
											</div>
										</div>
									</div>
									<div class="down-content">
										<h4>{item.name}</h4>
										<span>{item.role}</span>
										<p class="limit-line-2">{item.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
		const loadingComponent = <LoadingComponent loading={true}/>
		return () => (
			<div>
				{loadingComponent}
				<header-component/>
				{headerImage}
				{aboutFeature}
				{teamMember}
				<our-customer-component/>
				<footer-component/>
			</div>
		)
	}
})
</script>