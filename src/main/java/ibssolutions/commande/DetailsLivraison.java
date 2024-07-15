package ibssolutions.commande;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import ibssolutions.entity.vente.Panier;

@Entity
public class DetailsLivraison implements Serializable{

	/**
	 *  17/03/2021 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
		
	@Column(name="quantite_commande", nullable = true)
	private int qteCommande;
	
	@Column(name="reste_a_livrer", nullable = true)
	private int resteALivrer;
	
	@Column(name="reste", nullable = true)
	private int reste;
	
	@Column(name="quantite_a_livrer", nullable = true)
	private int qteALivrer;
	
	@ManyToOne
	@JoinColumn(name = "id_panier" , nullable = false)
	private Panier panier;
	

	@Column(name="etat", nullable = false)
    private boolean etat;
	
	@Column(name="etat_imprimer", nullable = false)
    private boolean etatImprimer;
	
	@ManyToOne
	@JoinColumn(name = "id_bon_livraison" , nullable = false)
	private BonLivraison bonLivraison;

	public DetailsLivraison() {
		super();
	}

	public DetailsLivraison(Long id) {
		super();
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQteCommande() {
		return qteCommande;
	}

	public void setQteCommande(int qteCommande) {
		this.qteCommande = qteCommande;
	}

	public int getResteALivrer() {
		return resteALivrer;
	}

	public void setResteALivrer(int resteALivrer) {
		this.resteALivrer = resteALivrer;
	}

	public int getReste() {
		return reste;
	}

	public void setReste(int reste) {
		this.reste = reste;
	}

	public int getQteALivrer() {
		return qteALivrer;
	}

	public void setQteALivrer(int qteALivrer) {
		this.qteALivrer = qteALivrer;
	}

	public Panier getPanier() {
		return panier;
	}

	public void setPanier(Panier panier) {
		this.panier = panier;
	}

	public BonLivraison getBonLivraison() {
		return bonLivraison;
	}

	public void setBonLivraison(BonLivraison bonLivraison) {
		this.bonLivraison = bonLivraison;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}

	public boolean isEtatImprimer() {
		return etatImprimer;
	}

	public void setEtatImprimer(boolean etatImprimer) {
		this.etatImprimer = etatImprimer;
	}

	
}
