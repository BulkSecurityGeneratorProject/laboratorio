package com.labotech.lims.repository;

import com.labotech.lims.domain.Tbc_sub_grupo;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;


import java.util.List;

/**
 * Spring Data JPA repository for the Tbc_sub_grupo entity.
 */
@SuppressWarnings("unused")
public interface Tbc_sub_grupoRepository extends JpaRepository<Tbc_sub_grupo,Long> {
    @Query("select u from Tbc_sub_grupo u where u.nome like  %?1% and removido = ?2")
    Page<Tbc_sub_grupo> search(@Param("search") String search, @Param("removido") Boolean removido,Pageable pageable);

    @Query("select u from Tbc_sub_grupo u where removido = false")
    Page<Tbc_sub_grupo> findAll(Pageable pageable);

}
