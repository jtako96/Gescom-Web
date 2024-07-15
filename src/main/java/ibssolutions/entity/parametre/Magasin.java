package ibssolutions.entity.parametre;

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

@Entity @Table(name="magasin")
public class Magasin implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="libelle", length = 101, nullable = false)
	private String libelle;
	
	@Column(name="date_debut", length = 101, nullable = true)
	@Temporal(TemporalType.DATE)
	private Date dateDebut;
	
	@ManyToOne
	@JoinColumn(name="id_type_magasin", nullable = false)
	private TypeMagasin typeMagasin;
	
	@ManyToOne
	@JoinColumn(name="id_scrussale", nullable = false)
	private Scrussale scrussale;


	public Magasin() {
		super();
	}

	public Magasin(Long id) {
		super();
		this.id = id;
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

	public TypeMagasin getTypeMagasin() {
		return typeMagasin;
	}

	public void setTypeMagasin(TypeMagasin typeMagasin) {
		this.typeMagasin = typeMagasin;
	}

	public Scrussale getScrussale() {
		return scrussale;
	}

	public void setScrussale(Scrussale scrussale) {
		this.scrussale = scrussale;
	}

	
	
	
}
