export function create_List_Item_Markup({ imgURL, name, description, price }) {
  return `
      <picture class="card-photo">
          <img src="${imgURL}" alt="${name} photo" />
      </picture>
      <div class="card-text-content">
          <h4 class="card-title">${name}</h4>
          <p class="card-description">
          ${description}
          </p>
          <span class="card-price">$${price}</span>
      </div>`;
}
