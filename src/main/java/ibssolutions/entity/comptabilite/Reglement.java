package ibssolutions.entity.comptabilite;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import ibssolutions.entity.parametre.Banque;
import ibssolutions.entity.parametre.ModeReglement;
import ibssolutions.entity.vente.Vente;

@Entity
@Table(name = "reglement_client")
public class Reglement implements Serializable{

	/**
	 * 16/03/2021
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private double montantPayement;
	
	private String code;
	
	private String reference;
	
	private String obervation;
	
	@Temporal(TemporalType.DATE)
    @Column(name = "date_payement", nullable = true)
	private Date datePayement;
	
	@ManyToOne
	@JoinColumn(name = "id_vente", nullable = false)
	private Vente vente;
	
	@ManyToOne
	@JoinColumn(name = "id_banque", nullable = false)
	private Banque banque;
	
	@ManyToOne
	@JoinColumn(name = "id_mode_reglement", nullable = false)
	private ModeReglement modeReglement;

	public Reglement() {
		super();
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getMontantPayement() {
		return montantPayement;
	}

	public void setMontantPayement(double montantPayement) {
		this.montantPayement = montantPayement;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getObervation() {
		return obervation;
	}

	public void setObervation(String obervation) {
		this.obervation = obervation;
	}

	public Date getDatePayement() {
		return datePayement;
	}

	public void setDatePayement(Date datePayement) {
		this.datePayement = datePayement;
	}

	public Vente getVente() {
		return vente;
	}

	public void setVente(Vente vente) {
		this.vente = vente;
	}

	public Banque getBanque() {
		return banque;
	}

	public void setBanque(Banque banque) {
		this.banque = banque;
	}

	public ModeReglement getModeReglement() {
		return modeReglement;
	}

	public void setModeReglement(ModeReglement modeReglement) {
		this.modeReglement = modeReglement;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	
	
}
