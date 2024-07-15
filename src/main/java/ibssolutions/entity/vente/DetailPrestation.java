package ibssolutions.entity.vente;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class DetailPrestation implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="description", length = 255, nullable = true)
	private String description;
	
	@Column(name="prix_unitaire", length = 101, nullable = true)
	private double prixUnitaire;
	
	@Column(name="quantite",  nullable = true)
	private int quantite;
	
	@Column(name="reference", length = 101, nullable = true)
	private String reference;
	
	@Column(name="remise", length = 101, nullable = true)
	private double remise;
	
	@Column(name="montant_HT", length = 101, nullable = true)
	private double montantHT;
	
	@Column(name="montant_TVA", length = 101, nullable = true)
	private double montantTVA;
	
	@Column(name="montant_TTC", length = 101, nullable = true)
	private double montantTTC;
	
	@Column(name="montant_Remise", length = 101, nullable = true)
	private double montantRemise;
	
	@ManyToOne
	@JoinColumn(name = "id_prestation" , nullable = false)
	private Prestation prestation;

	public DetailPrestation() {
		super();
	}


	public DetailPrestation(Long id) {
		super();
		this.id = id;
	}

	


	public DetailPrestation(Prestation prestation) {
		super();
		this.prestation = prestation;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public double getRemise() {
		return remise;
	}

	public void setRemise(double remise) {
		this.remise = remise;
	}

	public double getMontantHT() {
		return montantHT;
	}

	public void setMontantHT(double montantHT) {
		this.montantHT = montantHT;
	}

	public double getMontantTVA() {
		return montantTVA;
	}

	public void setMontantTVA(double montantTVA) {
		this.montantTVA = montantTVA;
	}

	public double getMontantTTC() {
		return montantTTC;
	}

	public void setMontantTTC(double montantTTC) {
		this.montantTTC = montantTTC;
	}

	public double getMontantRemise() {
		return montantRemise;
	}

	public void setMontantRemise(double montantRemise) {
		this.montantRemise = montantRemise;
	}

	public Prestation getPrestation() {
		return prestation;
	}

	public void setPrestation(Prestation prestation) {
		this.prestation = prestation;
	}


	public double getPrixUnitaire() {
		return prixUnitaire;
	}

	public void setPrixUnitaire(double prixUnitaire) {
		this.prixUnitaire = prixUnitaire;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}
	
	

}
