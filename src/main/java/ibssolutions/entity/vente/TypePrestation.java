package ibssolutions.entity.vente;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import ibssolutions.entity.comptabilite.JournalComptable;

@Entity
public class TypePrestation implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ;
	
	private String libelle;
	
	@ManyToOne
	@JoinColumn(name = "id_journal" , nullable = false)
	private JournalComptable journalComptable;

	public TypePrestation() {
		super();
	}

	public TypePrestation(String libelle) {
		super();
		this.libelle = libelle;
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

	public JournalComptable getJournalComptable() {
		return journalComptable;
	}

	public void setJournalComptable(JournalComptable journalComptable) {
		this.journalComptable = journalComptable;
	}
	
}
