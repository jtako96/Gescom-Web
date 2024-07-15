package ibssolutions.entity.parametre;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name = "exercices")
public class Exercice implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="libelle", length = 101, nullable = false)
	private String libelle;
	
	@Column(name="date_debut", length = 101, nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dateDebut;
	
	@Column(name="date_fin", length = 101, nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dateFin;
	
	@Column(name="etat", length = 1, nullable = true)
	private boolean etat;

	public Exercice() {
		super();
	}

	public Exercice(Long id, String libelle, Date dateDebut, Date dateFin, boolean etat) {
		super();
		this.id = id;
		this.libelle = libelle;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.etat = etat;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
