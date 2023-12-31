<script lang="tsx">
import {defineComponent, ref} from "vue";
import {ProductModel} from "@/base/model/product.model";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import {formatMoney} from "@/plugins/utils";
import {toast} from "vue3-toastify";

export default defineComponent({
	name: 'ProductComponent',
	components: {
		RatingComponent
	},
	props: {
		product: {
			type: ProductModel,
			default: () => new ProductModel(),
			required: true
		}
	},
	setup(props) {
		const product = ref(props.product);
		const addToCart = () => {
			product.value.quantity = 1;
			const cartList = localStorage.getItem('cartList');
			let cartListParse = cartList ? JSON.parse(cartList) : [];
			let isExist = false;
			cartListParse.forEach((item: ProductModel) => {
				if (item.id === product.value?.id) {
					isExist = true;
				}
			});
			if (!isExist) {
				cartListParse.push(product.value);
			}
			localStorage.setItem('cartList', JSON.stringify(cartListParse));
			toast.success('Thêm vào giỏ hàng thành công');
		}
		return () => (
			<div>
				<div class="product-card border-1 mb-7">
					<div role="button" title={product.value?.name} class="product-image" style={{"background-image": 'url(' + product.value?.imageThumbnail + ')'}}></div>
					<div class="product-info">
						<div class="product-title">{product.value?.name}</div>
						<div class="product-price">{formatMoney(product.value?.price)}</div>
						<div class="product-description limit-line-2">{product.value?.description}</div>
						<div class="product-rating d-flex justify-content-between">
							<div>
								<rating-component rating={product.value?.rating}/>
								<span class="total-reviews">({product.value?.totalReviews} reviews)</span>
							</div>
							<div>
								<button class="btn btn-primary btn-sm" onClick={addToCart}>
									<i class="bi bi-cart"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
</script>

<style>
.product-card {
	width: 100%;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: transform 0.3s ease;
}

.product-card:hover {
	transform: scale(1.05);
}

.product-image {
	width: 100%;
	height: 175px;
	background-size: cover;
	background-position: center;
}

.product-info {
	padding: 10px;
}

.product-title {
	font-size: 1rem;
	font-weight: bold;
	margin-bottom: 10px;
}

.product-price {
	color: #f33f3f;
	font-size: 0.8rem;
}

.total-reviews {
	font-size: 0.7rem;
}

@media (max-width: 768px) {
	.product-card {
		max-width: 100%;
	}
}

@media (max-width: 576px) {
	.product-card {
		margin: 20px 0;
	}
}

.product-description {
	margin: 10px 0;
	font-size: 0.7rem;
}
</style>
