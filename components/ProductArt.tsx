import type { Product } from "@/lib/marketplace";

export function ProductArt({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  if (product.image_url) {
    return (
      <div
        className={`product-art ${large ? "product-art-large" : ""}`}
        aria-label={`${product.title} preview`}
      >
        <img
          src={product.image_url}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`product-art art-${product.art} ${
        large ? "product-art-large" : ""
      }`}
      aria-label={`${product.title} preview`}
    >
      {product.art === "brand" && (
        <>
          <span className="art-paper paper-one" />
          <span className="art-paper paper-two" />
          <strong>form</strong>
          <i>
            BRAND
            <br />
            SYSTEM
          </i>
        </>
      )}

      {product.art === "gradient" && (
        <>
          <span className="art-gradient-g" />
          <b>G</b>
          <i>social</i>
        </>
      )}

      {product.art === "icons" && (
        <div className="icon-preview-grid">
          {Array.from({ length: 20 }).map((_, index) => (
            <span key={index}>
              {["◇", "◉", "⌁", "□", "△"][index % 5]}
            </span>
          ))}
        </div>
      )}

      {product.art === "alpine" && (
        <>
          <span className="mountain mountain-one" />
          <span className="mountain mountain-two" />
          <b>ALPINE</b>
          <i>EXPEDITION CO.</i>
        </>
      )}

      {product.art === "editorial" && (
        <>
          <span className="editorial-photo" />
          <b>
            SUMMER
            <br />
            ISSUE
          </b>
          <i>THE EDIT</i>
        </>
      )}

      {product.art === "dashboard" && (
        <>
          <b>Flux</b>
          <div className="dash-sidebar" />
          <div className="dash-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="dash-lines">
            <i />
            <i />
            <i />
          </div>
        </>
      )}

      {product.art === "illustration" && (
        <>
          <span className="illo-sun" />
          <span className="illo-face" />
          <span className="illo-body" />
          <span className="illo-leaf leaf-left" />
          <span className="illo-leaf leaf-right" />
        </>
      )}

      {product.art === "poster" && (
        <>
          <b>
            FORM
            <br />/ 26
          </b>
          <span className="poster-orb orb-one" />
          <span className="poster-orb orb-two" />
          <i>
            DESIGN
            <br />
            STUDIO
          </i>
        </>
      )}
    </div>
  );
}